const calculateSizeFiles = (data) => {
    const units = "BKMGT";
    //method one another method in the folder size.
    //divide by 3 becoz 1000 instead of 1024 (10^3)
    const u_index = Math.floor(Math.log10(data.size)/3);
    const h_form = (data.size/Math.pow(1024, u_index)).toFixed(1);
    return h_form+units[u_index];
}
 
export default calculateSizeFiles;