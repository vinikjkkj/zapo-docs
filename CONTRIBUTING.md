# Contributing to the Zapo docs

Thanks for helping improve the [zapo](https://github.com/vinikjkkj/zapo) documentation! This repo is the source for [zapo.to](https://zapo.to), built with [Mintlify](https://mintlify.com).

## The golden rule: keep both languages in sync

The docs are bilingual — **English** (`en/`) and **Brazilian Portuguese** (`pt-br/`) — and the two trees mirror each other 1:1.

- Any change to a page under `en/` **must** be mirrored in its `pt-br/` counterpart (and vice-versa).
- New pages must be added to **both** folders and to **both** language blocks in `docs.json`.

## How to contribute

### Edit on GitHub

Open the page, click the pencil/edit icon, make your change, and submit a pull request.

### Local development

```bash
git clone <your-fork>
npm i -g mint
mint dev          # preview at http://localhost:3000
mint broken-links # validate internal links before opening a PR
```

## Conventions

- **MDX + frontmatter** — each page starts with `title` and `description`; keep `icon` as-is.
- **Translate prose, not code** — in `pt-br/`, code blocks stay identical to `en/`; translate only prose and `// comments`, never string literals, identifiers, or type signatures.
- **Keep technical terms in English** — store, coordinator, JID, LID, stanza, payload, app-state, mutation, fanout, Noise, etc.
- **pt-BR heading anchors** — every heading in `pt-br/` carries an explicit `{#english-slug}` (matching the English heading's slug) so that cross-page `#anchor` links resolve. Preserve these when editing, and add one to any new heading.
- **Links** — internal links are language-scoped: `/en/...` in English pages, `/pt-br/...` in Portuguese pages. Don't cross languages.
- **Diagrams** — use ` ```mermaid ` blocks for flow/sequence diagrams.

## Writing style

- Active voice, second person ("you").
- One idea per sentence; lead with the goal.
- Sentence case for headings.
- Code formatting for file names, commands, paths, and identifiers.
- Show, don't just tell — include runnable examples.

## Ground rules

- Examples must match the real public API (`zapo-js`). When in doubt, check the source or the [coordinator reference](en/reference/client.mdx).
- This is an independent project, **not** affiliated with or endorsed by WhatsApp — keep that framing.

By contributing, you agree your contributions are licensed under the repository's [MIT license](LICENSE).
