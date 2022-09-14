const fs = require('fs');

class Employer {
    constructor(id, name, type, total_employee, city) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.total_employee = total_employee;
        this.city = city;
    }

    static getEmployers() {
        return new Promise((resolve, reject) => {
            fs.readFile('./json/employers.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let employers = JSON.parse(data);
                    employers = employers.map(employer => {
                        const { id, name, type, total_employee, city } = employer;

                        return new Employer(id, name, type, total_employee, city);
                    })
                    resolve(employers);
                }
            })

        })
    }

    static createEmployer(newEmployer) {
        return new Promise((resolve, reject) => {
            this.getEmployers()
                .then(result => {
                    let employers = result;
                    let id = employers[employers.length - 1].id + 1;

                    const { name, type, total_employee, city } = newEmployer;

                    const newDataEmployer = new Employer(id, name, type, total_employee, city);
                    employers.push(newDataEmployer);

                    this.save(employers);
                    resolve(employers);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static deleteEmployer(idEmployer) {
        return new Promise((resolve, reject) => {
            this.getEmployers()
                .then(result => {
                    let employers = result;

                    employers = employers.filter(employer => employer.id !== idEmployer);

                    this.save(employers);
                    resolve(employers);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static updateEmployer(idEmployer, newEmployer) {
        return new Promise((resolve, reject) => {
            this.getEmployers()
                .then(result => {
                    let employers = result;
                    const { name, type, total_employee, city } = newEmployer;

                    employers = employers.map(employer => {
                        if (employer.id === idEmployer) {
                            employer.name = name;
                            employer.type = type;
                            employer.total_employee = total_employee;
                            employer.city = city;
                        }
                        return employer;
                    })
                    this.save(employers);
                    resolve(employers);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static save(employers) {
        fs.writeFileSync('./json/employers.json', JSON.stringify(employers, null, 3));
    }
}

module.exports = Employer;