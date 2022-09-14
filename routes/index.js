const route = require('express').Router();

route.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Welcome to System Management Employee' });
})

const employeeRoutes = require('./employee');
route.use('/employees', employeeRoutes);

const jobRoutes = require('./job');
route.use('/jobs', jobRoutes);

const employerRoutes = require('./employer');
route.use('/employers', employerRoutes);

module.exports = route;