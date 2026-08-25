import jsdoc from "eslint-plugin-jsdoc"

const exported = [
  "ExportNamedDeclaration[declaration]",
  "ExportDefaultDeclaration[declaration.type='FunctionDeclaration']",
  "ExportDefaultDeclaration[declaration.type='ClassDeclaration']"
]

const restrict = (comment, message) => exported.map((context) => ({ context, comment, message }))
const lacking = (tag) => `JsdocBlock:not(*:has(JsdocTag[tag=${tag}]))`

const moduleHeader = {
  meta: {
    type: "suggestion",
    docs: { description: "require a module header block carrying @since" },
    schema: []
  },
  create: (context) => ({
    Program: (node) => {
      const source = context.sourceCode
      const first = node.body[0]
      const leading = first === undefined
        ? source.getAllComments()
        : source.getAllComments().filter((comment) => comment.range[1] <= first.range[0])
      const header = leading.find((comment) =>
        comment.type === "Block"
        && comment.value.startsWith("*")
        && (/^\s*\*\s*@module\b/m.test(comment.value) || !/^\s*\*\s*@category\b/m.test(comment.value))
      )
      if (header !== undefined && /^\s*\*\s*@since\b/m.test(header.value)) return
      context.report({ node, message: "Every module needs a header block with @since." })
    }
  })
}

export const jsdocConvention = [{
  files: ["src/**/*.ts"],
  ignores: ["src/**/*.test.ts"],
  plugins: { jsdoc, "canonical-jsdoc": { rules: { "module-header": moduleHeader } } },
  rules: {
    "jsdoc/require-jsdoc": ["error", {
      require: {
        ArrowFunctionExpression: false,
        ClassDeclaration: false,
        ClassExpression: false,
        FunctionDeclaration: false,
        FunctionExpression: false,
        MethodDefinition: false
      },
      contexts: exported
    }],
    "jsdoc/require-description": ["error", { contexts: exported, exemptedBy: ["inheritdoc", "private"] }],
    "jsdoc/no-restricted-syntax": ["error", {
      contexts: [
        ...restrict(lacking("since"), "Every exported declaration needs @since."),
        ...restrict(
          `${lacking("category")}:not(*:has(JsdocTag[tag=private]))`,
          "Every exported declaration needs @category unless it is private."
        )
      ]
    }],
    "canonical-jsdoc/module-header": "error",
    "jsdoc/check-tag-names": ["error", { definedTags: ["category", "since", "slop"] }]
  }
}]
