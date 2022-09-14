const jobRoute = require('express').Router();
const JobController = require('../controllers/JobController');

jobRoute.get('/', JobController.getDataJob);
jobRoute.post('/create', JobController.createDataJob);
jobRoute.get('/delete/:id', JobController.deleteDataJob);
jobRoute.post('/update/:id', JobController.updateDataJob);

module.exports = jobRoute;