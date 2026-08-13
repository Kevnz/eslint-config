# Coding Standards

This document describes the coding standards enforced by `@kev_nz/eslint-config`
(as defined in [eslint-config.json](./eslint-config.json)). Any project extending
this config gets these rules automatically.

## Overview

The config is built from four pillars:

1. **Prettier** for all code formatting (formatting violations are lint errors)
2. **SonarJS** (recommended set) for code-quality and bug-detection rules
3. **React** (recommended set) for JSX/React correctness
4. **Import hygiene** via `eslint-plugin-import`

Parsing uses `@babel/eslint-parser`, so modern JavaScript syntax that Babel
understands is accepted. The target environment is **Node.js with CommonJS
modules and Jest** — browser globals are *not* assumed (`env.browser: false`,
`env.commonjs: true`, `env.jest: true`).

## Formatting (Prettier — enforced as an error)

All formatting is delegated to Prettier with these settings:

| Setting | Value | Meaning |
| --- | --- | --- |
| `printWidth` | 80 | Lines wrap at 80 characters |
| `tabWidth` | 2 | Two-space indentation |
| `useTabs` | false | Spaces, never tabs |
| `semi` | false | **No semicolons** |
| `singleQuote` | true | Single quotes for strings |
| `trailingComma` | `es5` | Trailing commas where valid in ES5 (objects, arrays) |
| `bracketSpacing` | true | Spaces inside object literals: `{ foo: bar }` |
| `jsxBracketSameLine` | false | JSX closing `>` goes on its own line |
| `arrowParens` | `avoid` | Omit parens on single-arg arrows: `x => x * 2` |

Any Prettier-conflicting stylistic ESLint rules are disabled via
`eslint-config-prettier`, so Prettier is the single source of truth for style.

### Trailing commas (explicit `comma-dangle` rule)

In addition to Prettier's setting, `comma-dangle` is configured as an error:

- **Required** on multiline arrays, objects, imports, and exports
- **Never allowed** in function argument/parameter lists

## Imports

- **Imports must come first** in the file, with absolute (package) imports
  before relative ones (`import/first: absolute-first`).
- **Imports must be grouped and ordered** (`import/order`):
  1. Node built-ins (`fs`, `path`, …)
  2. External packages
  3. Internal modules
  4. Parent imports (`../`)
  5. Sibling imports (`./`)
  6. Index imports (`./index`)
- **Imports must resolve** (`import/no-unresolved` is an error). The resolver
  looks for `.js` and `.jsx` extensions.

## Console usage

`no-console` is a **warning**, but `console.info`, `console.warn`, and
`console.error` are allowed. In practice: don't use `console.log` — use one of
the intent-revealing variants instead.

## Testing

- **No focused tests** (`no-only-tests/no-only-tests` is an error): committing
  `describe.only` / `it.only` / `test.only` fails linting, preventing
  accidentally-skipped test suites.
- Jest globals (`describe`, `it`, `expect`, …) are available everywhere without
  imports.

## Code quality (SonarJS recommended)

The full `sonarjs/recommended` rule set applies. Highlights of what it catches:

- Cognitive-complexity limits on functions
- Duplicated branches, identical sub-expressions, and copy-pasted string literals
- Collapsible/nested `if` statements that should be merged
- Dead stores, unused collections, and functions that always return the same value
- `switch` statements with too few cases or missing sensible structure

## React

The `plugin:react/recommended` rule set applies (React version auto-detected),
with two deliberate opt-outs:

- `react/prop-types` is **off** — PropTypes declarations are not required.
- `react/display-name` is **off** — anonymous components are acceptable.

Everything else in the recommended set (valid JSX, no duplicate props, keys in
lists, no direct state mutation, etc.) is enforced.

## Spelling

`spellcheck/spell-checker` runs as a **warning** over comments, strings, and
identifiers (US English, minimum word length 3). This keeps typos out of names
and documentation.

- URLs (`http://…`) and `scope/package`-style strings are skipped.
- A curated skip-word list covers common tech vocabulary (`api`, `async`,
  `auth`, `graphql`, `middleware`, `params`, `utils`, `webpack`, …). Projects
  hitting false positives should extend `skipWords` rather than disabling the
  rule.

## Deliberately relaxed rules

These are explicitly turned off, i.e. allowed by choice:

- `arrow-body-style` — arrow functions may use block bodies or expression
  bodies as the author prefers.
- `no-param-reassign` — reassigning function parameters is permitted.
- `standard/computed-property-even-spacing` — not enforced (legacy of the
  Standard config lineage).

## Summary of the "house style"

- 2-space indent, single quotes, **no semicolons**, 80-column lines
- Trailing commas on multiline literals/imports/exports, never in function calls
- Imports first, grouped built-in → external → internal → relative, and they
  must resolve
- No `console.log` (use `info`/`warn`/`error`), no `.only` tests
- SonarJS keeps complexity and duplication in check; React recommended rules
  apply without PropTypes
- Spellchecked comments, strings, and identifiers (US English)
