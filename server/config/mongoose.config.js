const mongoose = require('mongoose');

const dbUsername = 'albinadervishi0';
const dbPassword = 'Dervishi2002';
const dbName = 'test';
const dbCluster = 'cluster0.52frosk.mongodb.net';

mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));