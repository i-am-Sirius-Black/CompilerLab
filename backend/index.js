const express = require('express');
const app = express();
const {generateFile} =require ('./generateFile');
const { executeCpp } = require('./executeCpp');
const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({online: "compiler"});
});

app.post("/run", async (req, res) => {

   const{language = 'cpp', code} = req.body;
//    console.log(language+" "+code);
    if(code === undefined){
        return res.status(404).json({success: false, error: "Empty code body!"});
    }
   
    try {
      
      //Generating file
      const filePath = await generateFile(language, code);

      //Execute the code file
      const output = await executeCpp(filePath);
      res.json({filePath, output});

    } catch (error) {
       res.status(500).json({error: error});
    }

   
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});