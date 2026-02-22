import { sql } from 'bun';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

await sql.begin(async (tx) => {
	await tx`
    CREATE TABLE IF NOT EXISTS "PressPost" (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      date TIMESTAMPTZ NOT NULL,
      content TEXT NOT NULL,
      authors TEXT[] NOT NULL DEFAULT '{}',
      createdAt TIMESTAMPTZ DEFAULT now() NOT NULL,
      updatedAt TIMESTAMPTZ DEFAULT now() NOT NULL
    );
  `;

	await tx`
    CREATE TABLE IF NOT EXISTS "EventsCache" (
    key TEXT PRIMARY KEY,
    payload JSONB NOT NULL,
    "fetchedAt" TIMESTAMPTZ DEFAULT now() NOT NULL
  );  
  `;
	await tx`
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW."updatedAt" = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

	await tx`DROP TRIGGER IF EXISTS update_presspost_timestamp ON "PressPost";`;

	await tx`
    CREATE TRIGGER update_presspost_timestamp
    BEFORE UPDATE ON "PressPost"
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
  `;
});

console.log('Migration complete.');
