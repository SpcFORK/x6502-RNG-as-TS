export function rol(value: number, carry: boolean): { result: number; carry: boolean; } {
  value &= 0xFF;
  const msb = (value >> 7) & 1;
  let result = (value << 1) & 0xFF;
  if (carry) result |= 1;
  carry = !!msb;
  return { result, carry };
}

