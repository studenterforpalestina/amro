import { sql } from 'bun';

await sql`
  INSERT INTO "PressPost"(slug, title, date, content, author, tag)
  VALUES
    ('first-post', 'Long title for an article we wrote ourselves', '2024-01-01', 'I''m a creep.', '', 'article'),
    ('second-post', 'Wow look we held a speech last demo', '2024-02-01', 'I''m a weirdo.', '', 'speech'),
    ('woohoo', 'This is a press release we have written', '2024-01-01', 'Solo ride until I die','me, myself, I', 'pressrelease')
  ON CONFLICT (slug) DO NOTHING;
`;
await sql`
  INSERT INTO "PressPost"(slug, title, date, content, tag, url)
  VALUES
    ('third-post', 'This is a press coverage about us', '2024-01-01', '', 'presscoverage', 'https://www.nrk.no/')
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
