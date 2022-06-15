import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import calculateSizeFolder from '../libs/calculateSizeFolder.js';
import calculateSizeFiles from '../libs/calculateSizeFiles.js';
let icon;
let size, sizeInBytes;
let timeStamp;
let date;

const buildMainContent = (staticPath, pathname) => {
    let mainContent = '';
    let items;
     
    try {
        items = readdirSync(staticPath+pathname);
    
    }catch(e) {
        console.error(`maincontent file error: ${e.message}`);
    }
    
    items.forEach(filename => {
    const link = join(pathname, filename);
    const itemStats = statSync(staticPath+link);
    if(itemStats.isDirectory()) {
        icon = 'folder';
        [size, sizeInBytes] = calculateSizeFolder(staticPath+link);
    }else if(itemStats.isFile()) {
        icon = 'document'
         size = calculateSizeFiles(itemStats);
         sizeInBytes = itemStats.size;
    }else{
        response.statusCode = 401;
        response.write('401: Access denied');
        response.end();
    }

    timeStamp = itemStats.mtimeMs;
    date = new Date(timeStamp).toLocaleString();
  
        
    mainContent += `
    <tr  data-name="${filename}" data-size="${sizeInBytes}" data-time="${date}">
        <td><a href="${link}" target='${itemStats.isFile() ? "_blank" : "" }'><ion-icon name="${icon}"></ion-icon> ${filename}</a></td>
        <td >${size}</td>
        <td>${date}</td>
     </tr>
    `
    });

       
    return mainContent;
}

 

export default buildMainContent;