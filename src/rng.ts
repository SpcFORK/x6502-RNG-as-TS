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

import { rol } from './asm'

function* B8RNG255(seed: number, lim = -1): Generator<number, { error: unknown, type: string, LAST_VAL: unknown }, number> {
  if (seed === undefined || seed === 0)
    throw new Error("Seed cannot be 0 or Falsey!");
  if (seed > 255 || seed < 0)
    throw new Error("Seed must be between 0 and 255!");

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
  let I: number = lim;
  let INP;
  G: while (!!I--) while (INP = yield LAST_VAL = init()) {
    if (typeof INP == 'boolean') if (INP) break G;
    else if (typeof INP === 'number') SEED = INP;
  }

  return { error: void 0, type: 'success', LAST_VAL }
}

export default eobj(B8RNG255, ['B8RNG255']).default