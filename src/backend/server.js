import * as crud from './crud.js';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();
app.use(logger('dev'));
app.use(cors());



app.post('/profile/create', async (req, res) => {
    const createProfile = await crud.createProfile(req.query.username, req.query.password);
    if (createProfile === undefined) {
        res.set("Content-Type", "text/plain").status(500).send("Issue with creating profile.");
    }
    else {
        res.status(200).json(createProfile);
    }
});

app.get('/profile/read', async (req, res) => {
    const readProfile = await crud.readProfile(req.query.username);
    if (readProfile === undefined) {
        res.set("Content-Type", "text/plain").status(500).send("Issue with creating profile.");
    }
    else if (readProfile === null) {
        res.set("Content-Type", "text/plain").status(404).send("Not found.");
    }
    else {
        res.status(200).json(readProfile); 
    }
});

app.put('/profile/update', async (req, res) => {
    const updateProfile = await crud.updateProfile(req.query.username, req.query.password);
    if (updateProfile === undefined) {
        res.set("Content-Type", "text/plain").status(500).send("Issue with creating profile.");
    }
    else if (updateProfile === null) {
        res.set("Content-Type", "text/plain").status(404).send("Not found.");
    }
    else {
        res.status(200).json(updateProfile); 
    }
});

app.delete('/profile/delete', async (req, res) => {
    const deleteProfile = await crud.deleteProfile(req.query.username);
    if (deleteProfile === undefined) {
        res.set("Content-Type", "text/plain").status(500).send("Issue with creating profile.");
    }
    else if (deleteProfile === null) {
        res.set("Content-Type", "text/plain").status(404).send("Not found.");
    }
    else {
        res.status(200).json(deleteProfile); 
    }
})

app.listen(3000, () => {
    console.log(`App listening at port 3000.`);
})