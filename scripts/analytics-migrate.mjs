// Applies scripts/analytics-schema.sql to the Neon database in DATABASE_URL.
// Usage: node --env-file=.env.local scripts/analytics-migrate.mjs
import { readFile } from 'node:fs/promises'
import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is not set. Run `vercel env pull` first.')
  process.exit(1)
}

const sql = neon(url)
const schema = await readFile(new URL('./analytics-schema.sql', import.meta.url), 'utf8')

const statements = schema
  .split('\n')
  .filter((line) => !line.trim().startsWith('--'))
  .join('\n')
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean)

for (const statement of statements) {
  await sql.query(statement)
}

console.log(`Applied ${statements.length} statements.`)
