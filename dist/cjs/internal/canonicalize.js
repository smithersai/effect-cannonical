"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var canonicalize_exports = {};
__export(canonicalize_exports, {
  canonicalize: () => canonicalize
});
module.exports = __toCommonJS(canonicalize_exports);
const hasToJson = (value) => "toJSON" in value && typeof value.toJSON === "function";
const assertWellFormed = (value) => {
  for (let index = 0; index < value.length; index++) {
    const code = value.charCodeAt(index);
    if (code >= 55296 && code <= 56319) {
      const next = value.charCodeAt(index + 1);
      if (index + 1 >= value.length || next < 56320 || next > 57343) {
        throw new TypeError("Lone surrogate is not allowed");
      }
      index++;
    } else if (code >= 56320 && code <= 57343) {
      throw new TypeError("Lone surrogate is not allowed");
    }
  }
  return value;
};
const serialize = (value, ancestors) => {
  if (typeof value === "number" && Number.isNaN(value)) {
    throw new TypeError("NaN is not allowed");
  }
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new TypeError("Infinity is not allowed");
  }
  if (typeof value === "string") {
    return JSON.stringify(assertWellFormed(value));
  }
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (ancestors.has(value)) {
    throw new TypeError("Circular reference detected");
  }
  ancestors.add(value);
  try {
    if (hasToJson(value)) {
      return serialize(value.toJSON(), ancestors);
    }
    if (Array.isArray(value)) {
      const items = value.map(
        (item) => item === void 0 || typeof item === "symbol" ? "null" : serialize(item, ancestors)
      );
      return `[${items.join(",")}]`;
    }
    const record = value;
    const members = Object.keys(record).sort().flatMap((key) => {
      const member = record[key];
      if (member === void 0 || typeof member === "symbol") {
        return [];
      }
      return [`${JSON.stringify(assertWellFormed(key))}:${serialize(member, ancestors)}`];
    });
    return `{${members.join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
};
const canonicalize = (value) => serialize(value, /* @__PURE__ */ new WeakSet());
//# sourceMappingURL=canonicalize.js.map
