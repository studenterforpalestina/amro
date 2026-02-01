import { sql } from 'bun';

await sql`
  INSERT INTO "PressPost"(slug, title, date, content)
  VALUES
    ('first-post', 'My First Press Post', '2024-01-01', 'I''m a creep.'),
    ('second-post', 'Another Press Update', '2024-02-01', 'I''m a weirdo.')
  ON CONFLICT (slug) DO NOTHING;
`;

await sql`
  INSERT INTO "Member" (name, "phoneNumber", "birthYear", "graduationYear", "isActive", email)
  VALUES
    ('Alb B', '+4740000000', 2001, 2026, true, 'alb@yazidi.com'),
    ('sim Naveed iqbal', '+92 000 33 222', 2001, 2026, true, 'iqbal@saim.com'),
    ('lusy', '+55 123 45 678', 2001, 2028, false, 'luc@na.com' ),
    ('Tor Grande', '+47976 16 918', 1963, 2007, true, 'old@mfer.com')
  ON CONFLICT (email) DO NOTHING;
`;

console.log('Seed complete.');
