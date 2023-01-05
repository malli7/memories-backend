import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.URL;
import posts from './routes/Posts.js';
import users from './routes/Users.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


mongoose.set("strictQuery", true);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to mongo");
});


app.use('/posts', posts)
app.use('/users', users)


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});