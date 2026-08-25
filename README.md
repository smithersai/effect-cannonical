<!-- Deep reviewed and polished by a human. -->

# `@smthrs/canonical`

Two objects with the same entries in different key order — `{ a: 1, b: 2 }` and `{ b: 2, a: 1 }` — serialize to the same string, so their digests and keys match.

This package wraps [`canonicalize`](https://www.npmjs.com/package/canonicalize) in Effect, following the [RFC 8785 JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785.html).

It is developed and released independently from Smithers Flows. Install it
directly with `pnpm add @smthrs/canonical effect@4.0.0-rc.108`.

```typescript
import { Canonical } from "@smthrs/canonical"
import { Schema } from "effect"

const document = Schema.decodeUnknownSync(Canonical)({ b: 2, a: 1 })
// '{"a":1,"b":2}'
```

## Development

```sh
pnpm install --frozen-lockfile
pnpm run verify
```

`verify` runs formatting and lint checks, TypeScript checks, the Vitest suite,
and the ESM/CJS build. Built ESM, CommonJS, and declaration files are committed
so a SHA-pinned GitHub tarball is directly installable without lifecycle
scripts. npm publishing is intentionally not part of this repository's CI.
