declare function B8RNG255(seed: number, core: (core?: any) => {}): Generator<number, {
    error: unknown;
    type: string;
    LAST_VAL: unknown;
}, number>;
declare const _default: typeof B8RNG255;

export { _default as default };
