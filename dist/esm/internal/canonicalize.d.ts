/**
 * RFC 8785 (JSON Canonicalization Scheme) serialization.
 *
 * Inlined replacement for the `canonicalize` npm package: that library ships
 * ESM-only `exports`, so the CJS build produced for release artifacts could
 * never `require` it. The algorithm is small enough to own — member keys are
 * sorted by UTF-16 code units and numbers use ECMAScript's `JSON.stringify`
 * serialization, both exactly as RFC 8785 specifies.
 *
 * @since 0.1.0
 */
/**
 * Serializes a JSON value into its RFC 8785 canonical form.
 *
 * Returns `undefined` when the top-level value has no JSON representation
 * (`undefined`, a symbol, or a function), mirroring `JSON.stringify`.
 * Throws on non-finite numbers, circular references, and strings or property
 * names carrying a lone surrogate, none of which RFC 8785 can represent.
 *
 * @category constructors
 * @since 0.1.0
 * @slop
 */
export declare const canonicalize: (value: unknown) => string | undefined;
//# sourceMappingURL=canonicalize.d.ts.map