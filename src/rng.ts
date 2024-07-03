/* x65-02 ASM - B8 RNG 255
.ZEROPAGE
SEED: .RES 2

.CODE
PRNG:
    LDY #8      ; Iter count
    LDA SEED+0
LOOP_START:
    ASL         ; Shift
    ROL SEED+1
    BCC SKIP_MASK
    EOR #$39    ; Mask
SKIP_MASK:
    DEY
    BNE LOOP_START
    STA SEED+0
    CMP #0      ; Reload Flags
    RTS
*/

import eobj from './eobj';

function* B8RNG255(seed: number, core: (core?: any) => {}): Generator<number, { error: unknown, type: string, LAST_VAL: unknown }, number> {
  if (seed === undefined || seed === 0)
    throw new Error("Seed cannot be 0 or Falsey!");
  if (seed > 255 || seed < 0)
    throw new Error("Seed must be between 0 and 255!");

  function rol(value: number, carry: boolean): { result: number; carry: boolean; } {
    value &= 0xFF;
    const msb = (value >> 7) & 1;
    let result = (value << 1) & 0xFF;
    if (carry) result |= 1;
    carry = !!msb;
    return { result, carry };
  }

  let y: number, a: number, carryG: boolean, SEED: number;
  function init(): number {
    SEED ||= (seed & 0xFF);
    y = 8;
    a = SEED & 0xFF;
    carryG = false;
    return loopStart();
  }

  function loopStart(): number {
    a <<= 1;

    let { result, carry } = rol((a >> 1) & 0xFF, carryG);
    [a, carryG] = [result, carry];

    if (carryG) a ^= 0x39;
    return loopEnd();
  }

  function loopEnd(): number {
    y--;
    if (y !== 0) return loopStart();
    SEED = (SEED & ~0xFF) | (a & 0xFF);
    return SEED;
  }

  let LAST_VAL: number | undefined = void 0;
  let CROSSCONTAM: unknown;
  let state = new class {
    on = true
    lastVal = () => LAST_VAL
    cross = () => CROSSCONTAM
  }

  while (state.on) try {
    LAST_VAL = init();
    CROSSCONTAM = yield LAST_VAL;
    core?.(state);
    if (typeof CROSSCONTAM == 'boolean') state.on = false;
    else if (typeof CROSSCONTAM == 'number') SEED = CROSSCONTAM;
  } catch (e) {
    return { error: e, type: 'error', LAST_VAL }
  }

  return { error: void 0, type: 'success', LAST_VAL }
}

export default eobj(B8RNG255, ['B8RNG255']).default