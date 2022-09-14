const Employer = require('../models/Employer');

class EmployerController {
    static getDataEmployer(req, res) {
        Employer.getEmployers()
            .then(result => {
                // res.send(result);
                res.render('./employerPage.ejs', { title: 'Halaman Employer', dataEmployers: result })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static createDataEmployer(req, res) {
        let newEmployer = req.body;

        Employer.createEmployer(newEmployer)
            .then(result => {
                // res.send(result);
                res.redirect('/employers');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static deleteDataEmployer(req, res) {
        let idEmployer = +req.params.id;

        Employer.deleteEmployer(idEmployer)
            .then(result => {
                // res.send(result);
                res.redirect('/employers');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static updateDataEmployer(req, res) {
        let idEmployer = +req.params.id;
        let newEmployer = req.body;

        Employer.updateEmployer(idEmployer, newEmployer)
            .then(result => {
                // res.send(result);
                res.redirect('/employers');
            })
            .catch(err => {
                res.send(err);
            })
    }

}

module.exports = EmployerController;