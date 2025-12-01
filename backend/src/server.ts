import app from './app';
import { ensureUsersTable } from './db';

const PORT = process.env.PORT ?? 4000;

const start = async () => {
  if (!process.env.SKIP_DB_INIT) {
    try {
      await ensureUsersTable();
      console.log('Auth table ready');
    } catch (err) {
      console.error('Database init failed. Set DATABASE_URL and ensure Postgres is running.', err);
    }
  }
  app.listen(PORT, () => {
    console.log(`Palliative Care 360 API listening on port ${PORT}`);
  });
};

start();
