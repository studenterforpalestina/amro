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

await sql`
  INSERT INTO "Member" (name, "phoneNumber", "birthYear", "graduationYear", "isActive", email)
  VALUES
    ('Ola Nordmann', '+4712345678', 1990, 2015, true, 'ola@eksempel.no'),
    ('Kari Nordmann', '+4787654321', 1992, 2016, true, 'kari@eksempel.no'),
    ('Alice Smith', '+155512345', 1985, 2010, false, 'alice@example.com'),
    ('Bob Johnson', '+155567890', 1988, 2012, false, 'bob@example.com'),
    ('Max Mustermann', '+4955598765', 1995, 2020, true, 'max@beispiel.de'),
    ('Erika Mustermann', '+4955554321', 1993, 2018, true, 'erika@beispiel.de')

  ON CONFLICT (email) DO NOTHING;
`;

console.log('Seed complete.');
