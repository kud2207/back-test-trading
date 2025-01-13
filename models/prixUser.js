const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const soldeSchema = new Schema({
    solde: { type: Number, default: 300 },
},
{
    timestamps: true,
});

module.exports = model('Solde', soldeSchema);
