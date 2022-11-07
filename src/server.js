const express = require("express");
const userRouter = require("./routers/user-router");
const accountRouter = require("./routers/account-router")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/bank/api/v1/userservice", userRouter);
app.use("/bank/api/v1/accountservice", accountRouter);

app.listen(port, ()=>console.log(`server listening at ${port}`));