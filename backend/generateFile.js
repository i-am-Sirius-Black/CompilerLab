const fs= require('fs');
const path= require('path');
const {v4: uuid} = require('uuid');

const dirCodes =path.join(__dirname, 'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, { recursive:true} );
}
const generateFile= async (format, content) =>{     //format =language , content = code
    const jobID = uuid(); //fsdfesf1232
    const filename = `${jobID}.${format}`;  //fsdfesf1232.java
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, content);
    return filePath; 

    // console.log(jobID);
}

module.exports ={
    generateFile,
};