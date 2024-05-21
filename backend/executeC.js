import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath =path.join(__dirname, 'outputs');
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, { recursive: true} );
}

const executeC = (filePath, inputPath)=>{
   const jobID= path.basename(filePath).split(".")[0];  
   const outPath =path.join(outputPath, `${jobID}.exe`);

   return new Promise((resolve, reject)=>{

    // Command to compile the C file and then execute it with the specified input
      const compileAndRunCommand = `gcc "${filePath}" -o "${outPath}" && cd "${outputPath}" && .\\${jobID}.exe < "${inputPath}"`;

    // Execute the compileAndRunCommand using child_process.exec
      exec(compileAndRunCommand, (error, stdout, stderr) => {
              
          if (error) {
              reject({ error, stderr });
            } else if (stderr) {
              reject(stderr);
            } else {
              resolve(stdout);
            }
          });
          console.log(compileAndRunCommand);
   });
}


export { executeC };