const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './var.env' });

const app = require('./app');

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successful');
  });

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// CATCHING UNHANDLED REJECTION

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// CATCHING UNHANDLED EXCEPTION

process.on('unhandledException', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// CATCHING SIGTERM REQUESTS

process.on('SIGTERM', () => {
  console.log('SIGTERM Received Closing App');
  server.close(() => {
    console.log('Closed');
  });
});
