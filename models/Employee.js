const fs = require('fs');

class Employee {
    constructor(id, name, job, age, city) {
        this.id = id;
        this.name = name;
        this.job = job;
        this.age = age;
        this.city = city;
    }

    static getEmployees() {
        return new Promise((resolve, reject) => {
            fs.readFile('./json/employees.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let employees = JSON.parse(data);
                    employees = employees.map(employee => {
                        const { id, name, job, age, city } = employee;

                        return new Employee(id, name, job, age, city);
                    })
                    resolve(employees);
                }
            })
        })
    }

    static createEmployee(newEmployee) {
        return new Promise((resolve, reject) => {
            this.getEmployees()
                .then(result => {
                    let employees = result;
                    let id = employees[employees.length - 1].id + 1;

                    const { name, job, age, city } = newEmployee;

                    const newDataEmployee = new Employee(id, name, job, age, city);
                    employees.push(newDataEmployee);

                    this.save(employees);
                    resolve(employees);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static deleteEmployee(idEmployee) {
        return new Promise((resolve, reject) => {
            this.getEmployees()
                .then(result => {
                    let employees = result;
                    employees = employees.filter(employee => employee.id !== idEmployee);

                    this.save(employees);
                    resolve(employees);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static updateEmployee(idEmployee, newEmployee) {
        return new Promise((resolve, reject) => {
            this.getEmployees()
                .then(result => {
                    let employees = result;
                    const { name, job, age, city } = newEmployee;

                    employees = employees.map(employee => {
                        if (employee.id === idEmployee) {
                            employee.name = name;
                            employee.job = job;
                            employee.age = age;
                            employee.city = city;
                        }
                        return employee;
                    })
                    this.save(employees);
                    resolve(employees);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    static save(employees) {
        fs.writeFileSync('./json/employees.json', JSON.stringify(employees, null, 3));
    }
}

module.exports = Employee;