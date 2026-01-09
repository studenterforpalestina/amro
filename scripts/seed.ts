import 'dotenv/config';
import { sql } from 'bun';

await sql`
  INSERT INTO "PressPost"(slug, title, date, content)
  VALUES
    ('first-post', 'My First Press Post', '2024-01-01', 'I''m a creep.'),
    ('second-post', 'Another Press Update', '2024-02-01', 'I''m a weirdo.')
  ON CONFLICT (slug) DO NOTHING;
`;

console.log('Seed complete.');
