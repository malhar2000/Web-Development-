import { get } from 'https';

const mimeTypeLink = 'https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json';

export const getMimeType = function (extension) {
    return new Promise((resolve, reject) => {
        get(mimeTypeLink, (response) => {
            if (response.statusCode < 200 || response.statusCode >= 300) {
                // reporting errors
                reject(`Error: Failed to load ${mimeType}`)
                return false;
            }
            let content = '';
            response.on('data', (data) => {
                //getting the content
                content += data;
            });
            response.on('end', () => {
                //sending the extension to be used 
                //[extension] for finding the extension needed for the file....
                resolve(JSON.parse(content)[extension]);
            });
        });
    });
}

export default getMimeType;
