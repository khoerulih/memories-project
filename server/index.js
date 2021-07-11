import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL =
  'mongodb://root:jojh1234@memories-project-shard-00-00.iuenv.mongodb.net:27017,memories-project-shard-00-01.iuenv.mongodb.net:27017,memories-project-shard-00-02.iuenv.mongodb.net:27017/post?ssl=true&replicaSet=atlas-136anw-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.set('useFindAndModify', false);
