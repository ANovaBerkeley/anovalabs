const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

//need to create a validation function for id

//need to create a validation function for lesson

router.get('/', (req, res) => {
    queries.getAll().then(lessons => {
        res.json(lessons);
    });
});

router.get('/:id', (req, res, next) => {
    queries.getOne(req.params.id).then(lesson => {
        if(lesson){
            res.json(lesson);
        } else {
            res.status(404);
            next();
        }
    });
});

router.post('/', (req, res, next) =>{
    //validateLesson paramaters 
    queries.create(req.body).then(lessons => {
        res.json(lessons[0]);
    })
});

router.put('/:id', (req,res,next) => {
    //check that contents are valid through another fn
    queries.update(req.params.id, req.body).then(lessons =>{
        res.json(lessons[0]);
    })
})

router.delete('/:id', (req,res,next) =>{
    queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});



module.exports = router;