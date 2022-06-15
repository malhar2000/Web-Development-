import { join } from 'path';

const buildBreadcrumb = pathname => {

    const pathBreakDown = pathname.split('/').filter(element => element !== '');
    console.log(pathBreakDown);

    let breadcrumb = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;

    let link = '/';
    pathBreakDown.forEach((item, index) => { 
        link = join(link, item);
        if(index !== pathBreakDown.length - 1) {
           
            breadcrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
        }else{
            breadcrumb += `<li class="breadcrumb-item active" aria-current="page"><a href="${link}">${item}</a></li>`;
        }
        
    });
    return breadcrumb;
}

export default buildBreadcrumb;