import app from './app';

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`Palliative Care 360 API listening on port ${PORT}`);
});
