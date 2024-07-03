/* 
; Returns a random 8-bit number in A (0-255), clobbers Y (unknown).
prng:
    lda seed+1          ; Load the high byte of seed into the accumulator
    tay                 ; Copy the accumulator to the Y register (store high byte)
    ; compute seed+1 ($39>>1 = %11100)
    lsr                 ; Logical Shift Right the accumulator by 1 bit (dividing by 2)
    lsr                 ; Logical Shift Right again by 1 bit
    lsr                 ; And again (3rd time)
    sta seed+1          ; Store the modified high byte back to seed+1
    lsr                 ; Continue shifting right to further transform seed+1
    eor seed+1          ; Exclusive OR accumulator with seed+1
    lsr                 ; Shift right again
    eor seed+1          ; Exclusive OR with seed+1 again
    eor seed+0          ; Exclusive OR with seed+0, recombining low byte
    sta seed+1          ; Store result back into seed+1
    ; compute seed+0 ($39 = %111001)
    tya                 ; Transfer Y register (original high byte) back to accumulator
    sta seed+0          ; Store accumulator into seed+0
    asl                 ; Arithmetic Shift Left (multiply by 2)
    eor seed+0          ; Exclusive OR with seed+0
    asl                 ; Arithmetic Shift Left again
    eor seed+0          ; Exclusive OR with seed+0 again
    asl                 ; Arithmetic Shift Left again
    asl                 ; Arithmetic Shift Left again
    asl                 ; Arithmetic Shift Left one more time
    eor seed+0          ; Exclusive OR with seed+0 again
    sta seed+0          ; Store result back into seed+0
    rts                 ; Return from subroutine (end of function)
*/

import eobj from './eobj';

function* quickB8RNG255(seed: number, lim = -1): Generator<number, { error: unknown, type: string, LAST_VAL: unknown }, unknown> {

  let a: number, y: number, SEED = seed & 0xFF;
  function init() {
    a = (SEED >> 1) & 0xFF;
    y = a
  }

  function consume1() {
    // compute seed+1 ($39>>1 = %11100)
    // shift to consume zeroes on left...
    a >>>= 3;
    // now recreate the remaining bits in reverse order... %111
    SEED = (SEED & ~0xFF00) | (a & 0xFF);
    a >>>= 1;
    a ^= (SEED >> 1) & 0xFF;
    a >>>= 1;
    a ^= (SEED >> 1) & 0xFF;
    a ^= SEED && 0xFF;
    SEED = (SEED & ~0xFF00) | (a & 0xFF);
  }

  function consume2() {
    // compute seed+0 ($39 = %111001)
    // original high byte time
    a = y;
    SEED = (SEED & ~0xFF) | (a & 0xFF);
    a <<= 1;
    a ^= SEED & 0xFF;
    a <<= 3;
    a ^= SEED & 0xFF;
    SEED = (SEED & ~0xFF) | (a & 0xFF);
  }

  function doStep() {
    init();
    consume1();
    consume2();
    return SEED;
  }

  let LAST_VAL: number | undefined = void 0;
  let I: number = lim;
  let INP;
  G: while (!!I--) while (INP = yield LAST_VAL = doStep()) {
    if (typeof INP == 'boolean') if (INP) break G;
    else if (typeof INP === 'number') SEED = INP;
  }

  return { error: void 0, type: 'success', LAST_VAL }
}

export default eobj(quickB8RNG255, ['quickB8RNG255']).default;