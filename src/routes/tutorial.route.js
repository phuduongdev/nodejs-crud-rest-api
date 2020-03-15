module.exports = app => {
    const tutorialController = require('../controllers/tutorial.controller');
    const router = require('express').Router();

    router.post('/', tutorialController.create);
    router.get('/', tutorialController.findAll);
    router.get('/published', tutorialController.findAllPublished);
    router.get('/:id', tutorialController.findById);
    router.put('/:id', tutorialController.update);
    router.delete('/:id', tutorialController.delete);
    router.delete('/', tutorialController.deleteMulti);

    app.use('/api/tutorial', router);
};
