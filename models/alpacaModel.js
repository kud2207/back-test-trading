const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const assetSchema = new Schema({
    symbol: { type: String, required: true, unique: true }, // Symbole de l'actif
    type: { type: String, enum: ['stock', 'crypto'], required: true }, // Type d'actif : action ou crypto
    marketPrice: { type: Number, required: true }, // Prix actuel sur le marché, récupéré via Alpaca
    lastUpdated: { type: Date, default: Date.now }, // Date de la dernière mise à jour du prix
},
{
    timestamps: true,
});

module.exports = model('alpacaModel', assetSchema);
