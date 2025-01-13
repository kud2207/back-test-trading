const Alpaca = require('@alpacahq/alpaca-trade-api');

// Initialisation d'Alpaca avec les clés API et l'URL de base
const alpaca = new Alpaca({
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_SECRET_KEY,
    paper: true, // Mode paper trading activé
});

// Route pour récupérer les détails du compte
const  getUserAlpaca = async (req, res) => {
    try {
        const account = await alpaca.getAccount();
        res.status(200).json({
            status: "success",
            data: account,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: error.message,
            errorCode: error.message,
        });
    }
};

const actifMaket = async (req, res) => {
    try {
        const positions = await alpaca.getPositions();
        console.log("Données brutes des positions :", positions); 
        const filteredPositions = positions.map(position => {
            if (
                position.symbol &&
                position.qty &&
                position.avg_entry_price &&
                position.market_value
            ) {
                return {
                    symbol: position.symbol,
                    name: position.asset_class || "Unknown",
                    percentage: parseFloat(position.market_value) / parseFloat(position.market_value + position.unrealized_pl),
                    quantity: parseFloat(position.qty),
                    averageBuyPrice: parseFloat(position.avg_entry_price),
                    marketValue: parseFloat(position.market_value),
                };
            }
            return null; 
        }).filter(Boolean);

        res.status(200).json({
            status: "success",
            data: filteredPositions,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des actifs :", error);
        res.status(500).json({
            status: "error",
            message: error.message,
            errorCode: error.code || "unknown_error",
        });
    }
};


//add les Actif
const User = require('../models/userModel'); 

const creerCollectionAlpaca = async (req, res) => {
    try {
        const { assets } = req.body;
        
        const nouvelUtilisateur = new User({
            assets: assets ,   
        });
        const utilisateurSauvegarde = await nouvelUtilisateur.save();

        res.status(201).json({
            message: 'Utilisateur créé avec succès.',
            data: utilisateurSauvegarde,
        });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({
            message: 'Une erreur est survenue.',
            error: error.message,
        });
    }
};





// Voir les actifs 
const getUserAcrif = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json({
            message: 'Actifs récupérés avec succès.',
            data: users, 
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des actifs:', error);
        res.status(500).json({
            message: 'Une erreur est survenue.',
            error: error.message,
        });
    }
};


module.exports={
    getUserAlpaca,
    creerCollectionAlpaca,
    getUserAcrif,
    actifMaket,
}