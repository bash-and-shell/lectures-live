import app from './server.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const port = process.env.PORT || 5001;
let server;


mongoose.connect(
  process.env.LL_DB_URI, 
  {
    wtimeoutMS: 2500,
    useNewUrlParser: true
  }
).catch((err) => {
  console.error(err.stack);
  process.exit(1);
})
.then(async () => {
  app.listen(port,() => {
    console.log(`listening on port ${port}`);
  })
});