import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import UsersDAO from './dao/usersDAO.js'

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5001;

MongoClient.connect(
  process.env.LL_DB_URI, 
  {
    wtimeoutMS: 2500,
    useNewUrlParser: true
  }
).catch((err) => {
  console.error(err.stack);
  process.exit(1);
})
.then(async client => {
  await UsersDAO.injectDB(client)
  app.listen(port,() => {
    console.log(`listening on port ${port}`);
  })
});
