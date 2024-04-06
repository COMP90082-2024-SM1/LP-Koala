const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8081;


app.use(cors());

app.get("/api/home", (req, res)=> {
    res.json({message: "hello world"})
});

app.post("/api/log-in", (req, res) => {
    res.json({message: 'login success'})
})


app.listen(PORT, ()=> {
    console.log(`Server started at port ${PORT}`);
})