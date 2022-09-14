const Employee = require('../models/Employee');

class EmployeeController {
    static getDataEmployee(req, res) {
        Employee.getEmployees()
            .then(result => {
                // res.send(result);
                res.render('employeePage.ejs', { title: 'Halaman Employee', dataEmployees: result })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static createDataEmployee(req, res) {
        let newEmployee = req.body;
        Employee.createEmployee(newEmployee)
            .then(result => {
                // res.send(result);
                res.redirect('/employees')
            })
            .catch(err => {
                res.send(err);
            })
    }

    static deleteDataEmployee(req, res) {
        let idEmployee = +req.params.id;
        Employee.deleteEmployee(idEmployee)
            .then(result => {
                res.redirect('/employees')
            })
            .catch(err => {
                res.send(err);
            })
    }

    static updateDataEmployee(req, res) {
        const idEmployee = +req.params.id;
        let newEmployee = req.body;

        Employee.updateEmployee(idEmployee, newEmployee)
            .then(result => {
                // res.send(result);
                res.redirect('/employees');
            })
            .catch(err => {
                res.send(err);
            })
    }
}

module.exports = EmployeeController;