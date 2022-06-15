import { parse } from 'url';
import { join, extname } from 'path';
import { existsSync, lstatSync, readFileSync, statSync, createReadStream } from 'fs';
 

import buildBreadcrumb from '../libs/breadcrumb.js';
import buildMainContent from '../libs/maincontent.js';
import getMimeType from '../libs/mimetype.js';
//getting the path of the current file and moving one folder back and then moving to static folder
// /Users/malhar/Web_dev/FileSystem(Node.js)/static
 

//getting the current working directory
//https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const __dirname = new URL('.', import.meta.url).pathname;
 
const staticPath = join(__dirname, '..', 'static');

export const respond = (request, response) => {
    
    //get the url 
    let pathname = parse(request.url, true).pathname;
    
    if (pathname === '/favicon.ico') {
        return false;
    }

    //helps to decode the i.e. %20 (space and etc)
    pathname = decodeURIComponent(pathname);
     
    //getting the full path of the file clicked
    const fullPathName = join(staticPath, pathname);
    
    if (!existsSync(fullPathName)) {
        console.log(`${fullPathName} does not exists`);
        response.write('404: File not found');
        response.end();
        return false;
    }
    let file_stats;
    try {
        file_stats = lstatSync(fullPathName);
    } catch (e) {
        console.log(`lstat error: ${e}`);
    }

    if (file_stats.isDirectory()) {

        //reading the index.html file to change the display content
        let data = readFileSync(join(staticPath, '..', 'index.html'), 'utf-8');
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element !== '');

        //changing title of the page
        const folderName = pathElements[0]??'File System';
        data = data.replace('File System', folderName);

        //changing the breadcrumb file path
        const breadcrumb = buildBreadcrumb(pathname);
        data = data.replace('pathname', breadcrumb);

        //build tabel rows
        const mainContent = buildMainContent(staticPath, pathname);

        // html content updated
        data = data.replace('main_content', mainContent);




        response.write(data);
        response.end();
    }
    // get file extension the user clicked to open
    let fileExtension = extname(staticPath + pathname);


    getMimeType(fileExtension)
        .then((mimeType) => {
            let head = {};
            let options = {};
            let statusCode = 200;

            head['Content-Type'] = mimeType;
            if (fileExtension === '.pdf') {

                //to display it online
                head['Content-Disposition'] = 'inline'

                // to make the file downloadable 
                // head['Content-Disposition'] = 'attachment; filename=resume.pdf'
            }

            // making videos fast fowardable
            if (RegExp('audio').test(mimeType) || RegExp('video').test(mimeType)) {
 
                head['Accept-Ranges'] = 'bytes';
                //getting the range
                // range will have "bytes = startByte - endByte"
                const range = request.headers.range;
     
                 

                //if range is defined
                if (range) {
                    let stat;
                    try {
                        stat = statSync(staticPath + pathname);
                    } catch (e) {
                        console.log(`error in the if video || audio: ${e.message}`);
                    }
                    //we need to extract start and end
                    const start_end = range.replace(/bytes=/, "").split('-');
           
                    const start = parseInt(start_end[0]);
                 
                    const end = start_end[1] ? parseInt(start_end[1]) : stat.size - 1;
                     
                    //Content-Range: <unit> <range-start>-<range-end>/<size>
                    head['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
                    head['Content-Length'] = end - start + 1;

                    options = {start, end};
                    statusCode = 206;
                }




            }

            //    fs.readFile(staticPath+pathname, 'utf-8', (err, data) => {
            //        if (err) {
            //            response.statusCode = 404;
            //            response.write('404: file read error');
            //            return response.end();
            //        }else{
            //            response.writeHead(statusCode, head);
            //            response.write(data);
            //            return response.end();
            //        }
            //    })


            //file stream is faster then fileread above and images work too with file stream
            const fileStream = createReadStream(staticPath + pathname, options);


            response.writeHead(statusCode, head);
            fileStream.pipe(response);

            fileStream.on('close', () => {
                return response.end();
            });
            fileStream.on('error', err => {
                response.statusCode = 404;
                response.write('404: file stream error');
                return response.end();
            });

        })
        .catch((error) => {
            console.log("MimeTpye error: " + error);
            response.status = 500;
            response.write('500: Internal Server Error');
            return response.end();
        })
}

export default respond;