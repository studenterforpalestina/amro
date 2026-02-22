import { sql } from 'bun';

await sql`
  INSERT INTO "PressPost"(slug, title, date, content, authors)
  VALUES
    ('first-post', 'My First Press Post', '2024-01-01', 'Solo ride until I die',ARRAY['me','myself','I']),
    ('second-post', 'Another Press Update', '2024-02-01', 'I''m a weirdo.',ARRAY['me','myself','I']),
    ('post', 'My  Press Post', '2024-01-01', 'I''m a creep.',ARRAY['I']),
    ('post', 'My st Press Post', '224-01-01', 'Noen andre''m a creep.',ARRAY['me','myself','I'])
  ON CONFLICT (slug) DO NOTHING;
`;

await sql`
  INSERT INTO "PressPost"(slug, title, date, content)
  VALUES
    ('third-post', 'THIS IS ANON', '2024-01-01', 'I''m a creep.')
  ON CONFLICT (slug) DO NOTHING;
`;

console.log('Seed complete.');
