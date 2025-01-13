const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const actifSchema = new Schema({
    assets: 
        {
            symbol: { type: String}, // Symbole de l'actif, ex: 'AAPL', 'BTC'
            name: { type: String},
            pourcentage: { type: Number},
            quantity: { type: Number, default: 0 }, // Quantité possédée
            averageBuyPrice: { type: Number,}, // Prix d'achat moyen
            marketValue: { type: Number, default: 0 }, // Valeur actuelle du marché (actualisée via l'API Alpaca)
        }
    ,
},
{
    timestamps: true,
});

module.exports = model('Actif', actifSchema);
