import PouchDB from 'pouchdb';

const database = new PouchDB('db');

/**
 * @async
 * @endpoints /profile/create
 * @method POST
 * @description Asynchronously creates new profile in database catching an error if 
 * unsuccessful.
 * @requestBody {
 *  "username" - "Username for the new profile" (string, required),
 *  "password" - "Password of the new profile" (string, required)
 * }
 * @responseBody {
 *  "createProfile" : {The newly created profile object}
 * }
 * @statusCodes 
 * 200 Created: Profile successfully created.
 * 500 Internal Server Error: Unexpected error occurred on the server. 
 */

export async function createProfile(username, password) {
    const profile = { _id: username, password: password, highScore: 0};
    try {
        const createProfile = await database.put(profile);
        return profile;
    }
    catch (err) {
        return undefined;
    }
}

/**
 * @async
 * @endpoints /profile/read
 * @method GET
 * @description Asynchronously reads profile in database catching an error if 
 * key not found or unsuccessful.
 * @requestBody {
 *  "username" - "Username for the profile" (string, required),
 * }
 * @responseBody {
 *  "readProfile" : {The profile object}
 * }
 * @statusCodes 
 * 200 Successful: Profile successfully retrieved.
 * 404 Not Found: Key not found.
 * 500 Internal Server Error: Unexpected error occurred on the server. 
 */

export async function readProfile(username) {
    try {
        const readProfile = await database.get(username);
        return readProfile;
    }
    catch (err) {
        if (err.name === 'not_found') {
            return null;
        }
        return undefined;
    }
}

/**
 * @async
 * @endpoints /profile/update
 * @method PUT
 * @description Asynchronously updates profile in database catching an error if 
 * key not found or unsuccessful.
 * @requestBody {
 *  "username" - "Username for the profile" (string, required),
 *  "password" - "New password of the profile" (string, required)
 * }
 * @responseBody {
 *  "updateProfile" : {The update confirmation object}
 * }
 * @statusCodes 
 * 200 Successful: Profile successfully updated.
 * 404 Not Found: Key not found.
 * 500 Internal Server Error: Unexpected error occurred on the server. 
 */

export async function updateProfile(username, password) {
    try {
        const readProfile = await database.get(username);
        readProfile['password'] = password;
        const updateProfile = await database.put(readProfile);
        return updateProfile;
    }
    catch (err) {
        if (err.name === 'not_found') {
            return null;
        }
        return undefined;
    }
}

/**
 * @async
 * @endpoints /profile/delete
 * @method DELETE
 * @description Asynchronously deletes profile in database catching an error if 
 * key not found or unsuccessful.
 * @requestBody {
 *  "username" - "Username for the profile" (string, required),
 * }
 * @responseBody {
 *  "updateProfile" : {The update confirmation object}
 * }
 * @statusCodes 
 * 200 Successful: Profile successfully updated.
 * 404 Not Found: Key not found.
 * 500 Internal Server Error: Unexpected error occurred on the server. 
 */

export async function deleteProfile(username) {
    try {
        const readProfile = await database.get(username);
        const deleteProfile = await database.remove(readProfile);
        return deleteProfile;
    }
    catch (err) {
        if (err.name === 'not_found') {
            return null;
        }
        return undefined;
    }
}

