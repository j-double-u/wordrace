import * as http from 'http';
import * as url from 'url';
import * as crud from './crud.js';

async function basicServer(request, response) {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = request.method;

    if (method === 'POST' && pathname.startsWith('profile/createProfile')) {
        const createProfile = await crud.createProfile(query.username, query.password);
        if (createProfile === undefined) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write("Issue with creating profile.");
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(createProfile));
            response.end();
        }
    }
    else if (method === 'GET' && pathname.startsWith('profile/readProfile')) {
        const readProfile = await crud.readProfile(query.username);
        if (readProfile === undefined) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write("Issue with reading profile.");
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(readProfile));
            response.end();
        }
    }
    else if (method === 'PUT' && pathname.startsWith('profile/updateProfile')) {
        const updateProfile = await crud.updateProfile(query.username, query.password);
        if (updateProfile === undefined) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write("Issue with reading profile.");
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(updateProfile));
            response.end();
        }
    }
    else if (method === 'DELETE' && pathname.startsWith('profile/deleteProfile')) {
        const deleteProfile = await crud.deleteProfile(query.username);
        if (deleteProfile === undefined) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write("Issue with reading profile.");
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(deleteProfile));
            response.end();
        }
    }
    else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("Not found.");
        response.end();
    }
}

http.createServer(basicServer).listen(3000, () => {
    console.log('Server started on port 3000');

});