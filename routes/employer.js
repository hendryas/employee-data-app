const employerRoute = require('express').Router();
const EmployerController = require('../controllers/EmployerController');

employerRoute.get('/', EmployerController.getDataEmployer);
employerRoute.post('/create', EmployerController.createDataEmployer);
employerRoute.get('/delete/:id', EmployerController.deleteDataEmployer);
employerRoute.post('/update/:id', EmployerController.updateDataEmployer);

module.exports = employerRoute;