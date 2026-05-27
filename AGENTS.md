# Agent instructions — Zapo docs

Instructions for AI agents working in this repository.

## About this project

- Official documentation for [**zapo**](https://github.com/vinikjkkj/zapo) (`zapo-js`), a TypeScript implementation of the WhatsApp Web protocol.
- Built on [Mintlify](https://mintlify.com). Pages are MDX with YAML frontmatter; site config is in `docs.json`.
- Deployed to [zapo.to](https://zapo.to).
- Preview with `mint dev`; validate links with `mint broken-links`.

## Bilingual structure (read this first)

- Content lives in two mirrored trees: `en/` (English, default) and `pt-br/` (Brazilian Portuguese).
- **Every change to `en/` must be mirrored in `pt-br/`** (and vice-versa). Both languages are declared separately under `navigation.languages` in `docs.json`.
- When adding a page: create it in both folders and add it to both language blocks in `docs.json`.

## Translation rules (pt-br/)

- Translate `title`/`description` frontmatter; keep `icon` verbatim.
- Code blocks stay **identical** to English — translate only `//` and `/* */` comments, never string literals, identifiers, type signatures, schema/enum names, or `mermaid` diagram labels.
- Rewrite internal links from `/en/...` to `/pt-br/...`, preserving `#fragment` anchors.
- Keep conventional technical terms in English: store, backend, coordinator, JID, LID, PN, stanza, payload, app-state, mutation, fanout, prekey, sender key, Noise, ratchet, write-behind, keep-alive.

## Heading anchors

Every heading in `pt-br/` carries an explicit `{#english-slug}` matching the English heading's GitHub-style slug (lowercase, spaces→hyphens, punctuation removed; `&`/`/` surrounded by spaces produce double hyphens, e.g. `{#state-history--mex}`). This keeps cross-page `#anchor` links working despite translated heading text. Preserve existing anchors and add one to any new heading.

## Accuracy

- Examples must match the real public API of `zapo-js`. Verify against the library source or the [coordinator reference](en/reference/client.mdx) before documenting a method or type.
- The runtime API is coordinator-based: `client.message.send(...)`, `client.group.*`, etc. — not a flat `client.sendMessage`.
- Keep the "independent implementation, not affiliated with WhatsApp" framing.

## Style

- Active voice, second person ("you"); one idea per sentence; sentence case headings.
- Code formatting for files, commands, paths, identifiers; bold for UI elements.
- Use `<Note>`/`<Warning>`/`<Tip>`, `<CardGroup>`, `<Steps>`, `<AccordionGroup>`, and ` ```mermaid ` diagrams where they aid clarity.

## Mintlify product knowledge

For component reference and configuration details, install the Mintlify skill: `npx skills add https://mintlify.com/docs`.
