const Job = require('../models/Job');

class JobController {
    static getDataJob(req, res) {
        Job.getJob()
            .then(result => {
                // res.send(result);
                res.render('./jobPage.ejs', { title: 'Halaman Job', dataJobs: result })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static createDataJob(req, res) {
        let newJob = req.body;

        Job.createJob(newJob)
            .then(result => {
                // res.send(result);
                res.redirect('/jobs');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static deleteDataJob(req, res) {
        const idJob = +req.params.id;

        Job.deleteJob(idJob)
            .then(result => {
                // res.send(result);
                res.redirect('/jobs');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static updateDataJob(req, res) {
        const idJob = +req.params.id;
        let newJob = req.body;

        Job.updateJob(idJob, newJob)
            .then(result => {
                // res.send(result);
                res.redirect('/jobs');
            })
            .catch(err => {
                res.send(err);
            })
    }
}

module.exports = JobController;