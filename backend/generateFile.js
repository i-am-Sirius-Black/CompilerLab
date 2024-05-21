import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the directory path to 'codes' within the current module's directory
const dirCodes = path.join(__dirname, 'codes');

// Check if the directory specified by 'dirCodes' does not exist
if (!fs.existsSync(dirCodes)) {
    // If the directory does not exist, create it including any necessary parent directories
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content)=>{
   const jobID = uuid();
   const filename = `${jobID}.${format}`;
   const filePath = path.join(dirCodes, filename);
   await fs.writeFileSync(filePath, content);
   return filePath;
};

export { generateFile };
