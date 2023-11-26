const express = require('express');
const {idData, userData} = require('./validate/data');
const {checkParams, checkBody} = require('./validate/validate');
const fs = require('fs'); 
const path = require('path'); 
const fPath = path.join(__dirname, 'person.json');
const app = express();
let uniqueID = 0;
const users = [];

function writeJson(users, fPath) {
    fs.writeFile(fPath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error(err);
        }
    });
};

function readJson(fPath) {
    try{
        const data = fs.readFileSync(fPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

app.use(express.json());

app.get("/users", (req, res) => {
    const read = readJson(fPath);
    res.send({ read });
});

app.get('/users/:id', checkParams(idData), (req, res) => {
    const read = readJson(fPath);
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({user: null});
    }
});
app.post('/users', checkBody(userData), (req, res) => {
    const read = readJson(fPath);
    uniqueID += 1;

    read.push({
        id: uniqueID,
        ...req.body,
    });

    res.send({
        id: uniqueID,
    });
    writeJson(read, fPath);
});
app.put('/users/:id', checkParams(idData), checkBody(userData), (req, res) => {
    const read = readJson(fPath);
    const user = read.find((user) => user.id === Number(req.params.id));
    
    if (user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city;

        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
    writeJson(read, fPath);
});
app.delete('/users/:id', checkParams(idData), (req, res) => {
    const read = readJson(fPath);
    const user = read.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        read.splice(userIndex, 1);
        writeJson(read, fPath);
        res.send({user});
    } else {
        res.status(404);
        res.send({user: null});
    }
});
app.use((req, res) => {
    res.status(404).send({
        message: 'URL not found'
    })
});

app.listen(3000);