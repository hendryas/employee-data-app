const fs = require('fs');

class Job {
    constructor(id, name, category, max_salary, min_salary) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.max_salary = max_salary;
        this.min_salary = min_salary;
    }

    static getJob() {
        return new Promise((resolve, reject) => {
            fs.readFile('./json/jobs.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let jobs = JSON.parse(data);

                    jobs = jobs.map(job => {
                        const { id, name, category, max_salary, min_salary } = job;

                        return new Job(id, name, category, max_salary, min_salary);
                    })
                    resolve(jobs);
                }
            })
        })
    }

    static createJob(newJob) {
        return new Promise((resolve, reject) => {
            this.getJob()
                .then(result => {
                    let jobs = result;
                    let id = jobs[jobs.length - 1].id + 1;

                    const { name, category, max_salary, min_salary } = newJob;

                    const newDatajob = new Job(id, name, category, max_salary, min_salary);
                    jobs.push(newDatajob);

                    this.save(jobs);
                    resolve(jobs);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static deleteJob(idJob) {
        return new Promise((resolve, reject) => {
            this.getJob()
                .then(result => {
                    let jobs = result;

                    jobs = jobs.filter(job => job.id !== idJob);

                    this.save(jobs);
                    resolve(jobs);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static updateJob(idJob, newJob) {
        return new Promise((resolve, reject) => {
            this.getJob()
                .then(result => {
                    let jobs = result;
                    const { name, category, max_salary, min_salary } = newJob;

                    jobs = jobs.map(job => {
                        if (job.id === idJob) {
                            job.name = name;
                            job.category = category;
                            job.max_salary = max_salary;
                            job.min_salary = min_salary;
                        }
                        return job;
                    })
                    this.save(jobs);
                    resolve(jobs);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static save(jobs) {
        fs.writeFileSync('./json/jobs.json', JSON.stringify(jobs, null, 3));
    }
}

module.exports = Job;