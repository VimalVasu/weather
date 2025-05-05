# Weather App

## Getting Started

Follow these steps to get the Weather app up and running on your local machine.

### Prerequisites
- **Node.js** (v16 or later)
- **pnpm** (package manager)
- A **Supabase** account and project

---

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Set up Supabase
1. Log in to [Supabase](https://app.supabase.com) and create a new project.
2. In **Settings > API**, copy your **Project URL** and **anon public** key.
3. In Supabase's **SQL Editor**, run the following to create your tables and constraints:
```sql
-- Create tables if missing
create table if not exists habits (
  id serial primary key,
  user_id uuid not null,
  question text not null
);

create table if not exists entries (
  id serial primary key,
  habit_id integer references habits(id) on delete cascade,
  date date not null default current_date,
  value integer not null
);

-- Deduplicate today's entries and add UNIQUE constraint
delete from entries a
using entries b
where a.id > b.id
  and a.habit_id = b.habit_id
  and a.date = b.date;

alter table entries
  drop constraint if exists unique_habit_per_day,
  add constraint unique_habit_per_day unique (habit_id, date);
```

### 4. Configure environment variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and fill in your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-yourkey
   OPENAI_API_KEY=sk-yourkey
   ```

### 5. Run the development server
```bash
pnpm dev
```
Open http://localhost:3000 in your browser. The app should be running!

### 6. Run tests
- **Unit tests** (Vitest):
  ```bash
  pnpm test
  ```
- **End-to-end tests** (Playwright):
  ```bash
  pnpm e2e
  ```

### 7. Troubleshooting
- If you encounter runtime errors, ensure your `.env.local` values match your Supabase project.
- Check your Supabase table definitions under **Table Editor > Definition** to confirm the `unique_habit_per_day` constraint is present.

---

Now you’re ready to start exploring and extending the Weather app. Happy coding!

