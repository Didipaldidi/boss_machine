const minionRouter = require('express').Router();

module.exports = minionRouter;

const { ngettext } = require('mocha/lib/utils');
const{
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabase
} = require('./db');
const { deleteFromDatabasebyId } = require('./db');
const { EvalSourceMapDevToolPlugin } = require('webpack');

minionRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion){
        req.minion = minion;
        next();
    }
    else{
        res.status(404).send('> Id not found!');
    }
});

minionRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionRouter.put('/:minionId', (req, res, next) => {
    let updateMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

minionRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deleteMinion){
        res.status(204);
    }
    else{
        res.status(500);
    }
    res.send();
});