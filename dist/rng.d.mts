declare function B8RNG255(seed: number, lim?: number): Generator<number, {
    error: unknown;
    type: string;
    LAST_VAL: unknown;
}, number>;
declare const _default: typeof B8RNG255;

export { _default as default };
