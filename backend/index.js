import express from "express";
import { generateFile } from "./generateFile.js";
import {generateInputFile} from "./generateInputFile.js";
import { executeCpp } from "./executeCpp.js";
import { executeJava } from'./executeJava.js';
import { executePython} from './executePython.js';
import { executeC }  from './executeC.js';

import cors from "cors";

const app = express();

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ online: "Compiler" });
});

app.post("/run", async (req, res) => {
  const { language, code, input } = req.body;

  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code body!" });
  }
  try {

    let output;
    let filePath;
    const inputPath = await generateInputFile(input);

    if (language === 'cpp') {
      // Generating file and executing C++ code
      filePath = await generateFile(language, code);
      output = await executeCpp(filePath, inputPath);
    } else if (language === 'java') {
      // Generating file and executing Java code
      filePath = await generateFile(language, code);
      output = await executeJava(filePath, inputPath);
    }else if (language === 'py') {
      // Generating file and executing python code
      filePath = await generateFile(language, code);
      output = await executePython(filePath, inputPath);
    }else if (language === 'c') {
      // Generating file and executing c code
      filePath = await generateFile(language, code);
      output = await executeC(filePath, inputPath);
    }  else {
      // Handle other languages as needed
    }

    // const filePath = await generateFile(language, code);
    // const inputPath = await generateInputFile(input);
    // const output = await executeCpp(filePath, inputPath);

    res.json({filePath, inputPath, output});
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000!");
});
