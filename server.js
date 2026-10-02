require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/configs/db");

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});