import PouchDB from 'pouchdb';

const database = new PouchDB('db');

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

export async function updateProfile(username, password) {
    try {
        const readProfile = await database.get(username);
        readProfile['password'] = password;
        const updateProfile = await database.put(readProfile);
        return updateProfile;
    }
    catch (err) {
        return undefined;
    }
}

export async function deleteProfile(username) {
    try {
        const readProfile = await database.get(username);
        const deleteProfile = await database.remove(readProfile);
        return deleteProfile;
    }
    catch (err) {

        return undefined;
    }
}

