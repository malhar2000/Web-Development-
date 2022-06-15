import { execSync } from 'child_process';

const calculateSizeFolder = (path) => {
    let size = 0;
    let sizeInBytes = 0.0;
    //replace all spaces with \ for the path to execute
    path = path.replace(/\s/g, '\ ');
    try{
        // very imp. to have the "" on the path. or you will get an error
        // here we replace the space and then extract the size...
        size =  execSync(`du -sh "${path}"`).toString().replace(/\s/g, '').split('/')[0];
    }catch(e){
        console.error("Error in file calculateSizeFolder: "+e.message);
    }
    
    if(size[size.length - 1] === 'K'){
        sizeInBytes = (size.slice(0, -1)* 1024.0).toFixed(1);
    }else if(size[size.length - 1] === 'M'){
        sizeInBytes = (size.slice(0, -1) * 1024.0 * 1024).toFixed(1);
    }
    return [size, sizeInBytes];
}
 
export default calculateSizeFolder;