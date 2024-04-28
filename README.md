## Getting Started

This project uses NextJS (App Directory), PostgreSQL, Sequelize, TailwindCSS.

To setup this project in your local machine;

- Create a `.env` file by referencing `.env.examples`. Fill in the necessary details. We suggest using ([Supabase](https://supabase.com)) for quick database setup.
- Once you've configured the `.env` file and connected to your database, locate and run the `syncAndForceDB()` function only once to create the database tables.
- You're all set! Start the development server using one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Translations

Our primary objective is to support multiple languages comprehensively. Currently, translations are powered by AI and refined through user feedback. Please report any translation inaccuracies or suggest new languages by opening a GitHub issue.

## Developer's Note

In this initial version, I aimed for simplicity to facilitate user onboarding. While I've endeavored to address every aspect single-handedly, some TypeScript errors remain unresolved. Your contributions and feedback are highly valued and crucial for the app's evolution. Feel free to dive in to our To Do List and help improve our project!


### To Do List

- [ ] Discord Bot for checking holder status
- [ ] Better auth handling with Next Auth
- [ ] Require holder status for `Tier List`voting
- [ ] Management system