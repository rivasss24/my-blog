const mongoose = require('mongoose');


const dbConnection = async() => {
    try {

    await mongoose.connect(process.env.MONGODB_CNN);

    console.log('Bases de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error inicializando el proceso ');
    }
}



module.exports = {
    dbConnection
}

