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

minionRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
});

minionRouter.post('/:minionId/work', (req, res, next) => {
    const addWork = req.body;
    addWork.minionId = req.params.minionId;
    const createWork = addToDatabase('work', addWork);
    res.status(201).send(createWork);
});

minionRouter.param('workId', (req, res, next) => {
    const work = getFromDatabaseById('work', id);
    if(work){
        req.work = work;
        next();
    }
    else{
        res.status(404).send();
    }
});

minionRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId){
        res.status(400).send();
    }
    else{
        updateWork = updateInstanceInDatabase('work', req.body);
        res.send(updateWork);
    }
});

minionRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if(deleted){
        res.status(204);
    }
    else{
        res.status(500);
    }
});