const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnectLien = process.env.MONGODBCONNECTIONLIEN

const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoConnectLien, {  
            useNewUrlParser: true,  
            useUnifiedTopology: true 
        });
        console.log('MongoDB est connecté avec succès !');
    } catch (error) {
        if (error.message.includes('failed to connect')) {
            console.error("Problème de connexion : vérifiez l'URL de MongoDB.");
        } else {
            console.error("Erreur lors de la connexion à MongoDB :",error.message);
        }
    }
};

module.exports = connectMongoDB;
