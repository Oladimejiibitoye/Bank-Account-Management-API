const app = require('./app');
const connectDb = require("./db/connect");

//set port
const port = process.env.PORT || 5000

//database connection
const start = async () => {
  try {
    await connectDb(`${process.env.MONGO_URL}`);
    app.listen(port, console.log(`server is running on PORT: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();