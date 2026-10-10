const app = require("./src/app");
const connectDB=require("./src/config/db");
const {PORT}=require("./src/config/config");


connectDB();

app.listen(PORT,()=>{

    console.log(`Server is running on the port ${PORT}`);
    
});








