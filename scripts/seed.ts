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
    ('sim Naveed iqbal', '+92 000 33 222', 2001, 2026, true, 'øqbal@saim.com'),
    ('lusy', '+55 123 45 678', 2001, 2028, false, 'llc@na.com' ),
    ('Tor Grande', '+47976 16 918', 1963, 2007, true, 'opd@mfer.com'),
    ('Morgan', '+479152241', 2001, 2026, true, 'a1b@yazidi.com'),
    ('Hk 47', '+92 900 33 222', 2001, 2026, true, 'idbal@saim.com'),
    ('Natasha', '+55 123 45 678', 2001, 2028, false, 'luc@na.com' ),
    ('Abi', '+4740000000', 2001, 2026, true, '1b@yazidi.com'),
    ('Magnus THE Besh', '+92 000 33 222', 2001, 2026, true, 'iql@saim.com'),
    ('Elias', '+64 126 48 680', 2001, 2028, false, 'luc@na.com' ),
    ('Mio', '+4740000004', 1995, 2026, true, 'alb@yazidi.com'),
    ('Natasha', '+93 002 33 222', 197, 2023, true, 'bicbal@saim.com')
  ON CONFLICT (email) DO NOTHING;
`;

console.log('Seed complete.');
