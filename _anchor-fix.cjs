'use strict'
const fs = require('fs')
const path = require('path')

const ROOT = __dirname
const EN = path.join(ROOT, 'en')
const PT = path.join(ROOT, 'pt-br')

// GitHub-slugger compatible for ASCII English headings.
function slugify(text, seen) {
  let base = text
    .replace(/`/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, '')
    .replace(/ /g, '-')
  let slug = base
  if (seen) {
    let n = seen.get(base) || 0
    if (n > 0) slug = `${base}-${n}`
    seen.set(base, n + 1)
  }
  return slug
}

function listMdx(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listMdx(p))
    else if (entry.name.endsWith('.mdx')) out.push(p)
  }
  return out
}

// Parse headings (level, text, lineIndex), skipping frontmatter + code fences.
function parseHeadings(content) {
  const lines = content.split('\n')
  const headings = []
  let inFence = false
  let fenceMarker = null
  let inFrontmatter = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (i === 0 && line.trim() === '---') { inFrontmatter = true; continue }
    if (inFrontmatter) { if (line.trim() === '---') inFrontmatter = false; continue }
    const fenceMatch = line.match(/^(\s*)(```+|~~~+)/)
    if (fenceMatch) {
      const marker = fenceMatch[2][0]
      if (!inFence) { inFence = true; fenceMarker = marker }
      else if (marker === fenceMarker) { inFence = false; fenceMarker = null }
      continue
    }
    if (inFence) continue
    const h = line.match(/^(#{1,6})\s+(.*?)\s*$/)
    if (h) headings.push({ level: h[1].length, text: h[2], lineIndex: i })
  }
  return { lines, headings }
}

function stripExplicitId(text) {
  return text.replace(/\s*\{#[^}]+\}\s*$/, '').trim()
}

const relPaths = listMdx(EN).map((p) => path.relative(EN, p).split(path.sep).join('/'))

const warnings = []
// pageKey -> Set of heading ids that will exist after injection
const idsByPage = {}

for (const rel of relPaths) {
  const enPath = path.join(EN, rel)
  const ptPath = path.join(PT, rel)
  const pageKey = 'pt-br/' + rel.replace(/\.mdx$/, '')
  idsByPage[pageKey] = new Set()

  if (!fs.existsSync(ptPath)) { warnings.push(`MISSING pt-br file: ${rel}`); continue }

  const en = parseHeadings(fs.readFileSync(enPath, 'utf8'))
  const pt = parseHeadings(fs.readFileSync(ptPath, 'utf8'))

  // Compute EN slugs (with dedup) in order.
  const seen = new Map()
  const enSlugs = en.headings.map((h) => slugify(stripExplicitId(h.text), seen))

  if (en.headings.length !== pt.headings.length) {
    warnings.push(`HEADING COUNT MISMATCH ${rel}: en=${en.headings.length} pt=${pt.headings.length} — skipped injection`)
    // still record en slugs as the intended ids so validation can flag
    for (const s of enSlugs) idsByPage[pageKey].add(s)
    continue
  }

  // Inject explicit id onto each pt heading line.
  for (let k = 0; k < pt.headings.length; k++) {
    const slug = enSlugs[k]
    idsByPage[pageKey].add(slug)
    const li = pt.headings[k].lineIndex
    const raw = pt.lines[li]
    if (/\{#[^}]+\}\s*$/.test(raw)) continue // already has explicit id
    pt.lines[li] = raw.replace(/\s*$/, '') + ` {#${slug}}`
  }
  fs.writeFileSync(ptPath, pt.lines.join('\n'))
}

// ---- Validation: every internal #fragment in pt-br must have a matching id ----
const linkRe = /\((\/pt-br\/[^)\s#]+)?#([a-z0-9][a-z0-9_-]*)\)/gi
const missing = []
for (const rel of relPaths) {
  const ptPath = path.join(PT, rel)
  if (!fs.existsSync(ptPath)) continue
  const pageKey = 'pt-br/' + rel.replace(/\.mdx$/, '')
  const content = fs.readFileSync(ptPath, 'utf8')
  let m
  while ((m = linkRe.exec(content)) !== null) {
    const target = m[1] ? m[1].replace(/^\//, '') : pageKey
    const frag = m[2].toLowerCase()
    const ids = idsByPage[target]
    if (!ids) { missing.push(`${rel}: link -> ${target}#${frag} (UNKNOWN PAGE)`); continue }
    if (!ids.has(frag)) missing.push(`${rel}: #${frag} -> ${target} (NO MATCHING HEADING)`)
  }
}

console.log('Files processed:', relPaths.length)
console.log('\nWARNINGS:', warnings.length)
warnings.forEach((w) => console.log('  - ' + w))
console.log('\nUNRESOLVED ANCHOR LINKS:', missing.length)
missing.forEach((w) => console.log('  - ' + w))
