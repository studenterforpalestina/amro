import { sql } from 'bun';

await sql`
  INSERT INTO "PressPost"(slug, title, date, content)
  VALUES
    ('first-post', 'My First Press Post', '2024-01-01', 'I''m a creep.'),
    ('second-post', 'Another Press Update', '2024-02-01', 'I''m a weirdo.'),
    ('third-post', 'My First Press Post', '2024-01-01', 'I''m a creep.'),
    ('post', 'My  Press Post', '2024-01-01', 'I''m a creep.'),
    ('post', 'My st Press Post', '2024-01-01', 'EN TREDJE''m a creep.'),
    ('post', 'My st Press Post', '224-01-01', 'Noen andre''m a creep.'),
    ('post', 'My st Press Post', '2024-01-01', 'Leif''m a creep.')
  ON CONFLICT (slug) DO NOTHING;
`;

console.log('Seed complete.');
