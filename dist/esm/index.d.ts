/**
 * RFC 8785 canonical JSON, the serialization every digest in `flows` is taken
 * over.
 *
 * ```ts
 * import { Canonical } from "@smthrs/canonical"
 * import * as Schema from "effect/Schema"
 *
 * const document = Schema.decodeUnknownSync(Canonical)({ b: 1, a: 2 })
 * // => `{"a":2,"b":1}`
 * ```
 *
 * @since 0.1.0
 */
/**
 * @category schemas
 * @since 0.1.0
 * @slop
 */
export * from "./Canonical.ts";
//# sourceMappingURL=index.d.ts.map