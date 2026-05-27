# Zapo documentation

Official documentation for [**zapo**](https://github.com/vinikjkkj/zapo) (`zapo-js`) — the high-performance TypeScript implementation of the WhatsApp Web protocol.

🌐 **Live site:** [zapo.to](https://zapo.to) · 📦 **npm:** [`zapo-js`](https://www.npmjs.com/package/zapo-js)

Built with [Mintlify](https://mintlify.com). Pages are MDX files with YAML frontmatter; site configuration lives in [`docs.json`](docs.json).

## Languages

The docs are bilingual via Mintlify localization — **English** (default) and **Brazilian Portuguese** — selectable from the site's language switcher.

| Language | Folder | Code |
| --- | --- | --- |
| English | [`en/`](en/) | `en` |
| Português (BR) | [`pt-br/`](pt-br/) | `pt-BR` |

Every page exists in both folders. The two trees mirror each other 1:1.

## Structure

```
docs.json          # site config: navigation (per language), theme, navbar, SEO
en/                # English pages
pt-br/             # Brazilian Portuguese pages
  ├── introduction, installation, quickstart
  ├── concepts/    # architecture, authentication, identities, configuration, events, stores
  ├── guides/      # messaging, media, groups, newsletters, bots, presence, …
  ├── reference/   # client & coordinators, message types, chat mutations, low-level, stores, JIDs
  ├── concepts/    # advanced: protocol, internals, mobile
  └── troubleshooting
logo/ · images/    # logo, favicon, hero, and social-card assets
```

## Develop locally

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) and run the preview server from the repo root (where `docs.json` lives):

```bash
npm i -g mint
mint dev          # preview at http://localhost:3000
mint broken-links # validate internal links
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The key rule: **keep `en/` and `pt-br/` in sync** — any change to an English page must be mirrored in its Portuguese counterpart (and vice-versa).

## Publishing

Changes are deployed automatically to [zapo.to](https://zapo.to) when merged to the default branch (via the Mintlify GitHub app).

## Support the project

If `zapo` is useful to you, consider [sponsoring on GitHub](https://github.com/sponsors/vinikjkkj).

## License

[MIT](LICENSE) © vinikjkkj

> Independent implementation for engineering and interoperability research. Not affiliated with or endorsed by WhatsApp.
