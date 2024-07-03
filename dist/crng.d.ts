declare function quickB8RNG255(seed: number, lim?: number): Generator<number, {
    error: unknown;
    type: string;
    LAST_VAL: unknown;
}, unknown>;
declare const _default: typeof quickB8RNG255;

export { _default as default };
