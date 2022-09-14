const employeeRoute = require('express').Router();
const EmployeeController = require('../controllers/EmployeeController');

employeeRoute.get('/', EmployeeController.getDataEmployee);
employeeRoute.post('/create', EmployeeController.createDataEmployee);
employeeRoute.get('/delete/:id', EmployeeController.deleteDataEmployee);
employeeRoute.post('/update/:id', EmployeeController.updateDataEmployee);

module.exports = employeeRoute;