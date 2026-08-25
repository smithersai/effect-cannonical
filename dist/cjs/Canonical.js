"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Canonical_exports = {};
__export(Canonical_exports, {
  Canonical: () => Canonical
});
module.exports = __toCommonJS(Canonical_exports);
var Effect = __toESM(require("effect/Effect"), 1);
var Schema = __toESM(require("effect/Schema"), 1);
var SchemaGetter = __toESM(require("effect/SchemaGetter"), 1);
var SchemaIssue = __toESM(require("effect/SchemaIssue"), 1);
var import_canonicalize = require("./internal/canonicalize.js");
const CanonicalString = Schema.String.pipe(
  Schema.brand("@smthrs/canonical/Canonical")
);
const Canonical = Schema.Unknown.pipe(
  Schema.decodeTo(CanonicalString, {
    decode: SchemaGetter.transformOrFail(
      (value, parseOptions) => Effect.try({
        try: () => {
          const result = (0, import_canonicalize.canonicalize)(value);
          if (result === void 0) {
            throw new TypeError("The value is not valid JSON");
          }
          JSON.parse(result);
          return result;
        },
        catch: (cause) => new SchemaIssue.InvalidValue(
          { message: cause instanceof Error ? cause.message : String(cause) },
          value,
          parseOptions
        )
      })
    ),
    encode: SchemaGetter.transform(
      (document) => JSON.parse(document)
    )
  })
);
//# sourceMappingURL=Canonical.js.map
