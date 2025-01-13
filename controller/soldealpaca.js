const Solde = require('../models/prixUser'); 

// Fonction pour ajouter au solde
const ajouterSolde = async (req, res) => {
    try {
        let { montant } = req.body;
        montant = Number(montant);

        if (isNaN(montant)) {
            return res.status(400).json({ message: 'Le montant doit être un nombre valide.' });
        }

        let solde = await Solde.findOne();
        if (!solde) {
            solde = new Solde({ solde: 1000 });
            await solde.save();
        }
        solde.solde += montant;
        await solde.save();
        res.status(200).json({
            message: 'Montant ajouté avec succès.',
            data: solde,
        });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du solde:', error);
        res.status(500).json({
            message: 'Une erreur est survenue.',
            error: error.message,
        });
    }
};

// Fonction pour soustraire du solde
const soustraireSolde = async (req, res) => {
    try {
        let { montant } = req.body;
        montant = Number(montant);

        if (isNaN(montant)) {
            return res.status(400).json({ message: 'Le montant doit être un nombre valide.' });
        }

        let solde = await Solde.findOne();
        if (!solde) {
            return res.status(404).json({ message: 'Solde introuvable.' });
        }

        if (solde.solde < montant) {
            return res.status(400).json({ message: 'Solde insuffisant.' });
        }
        solde.solde -= montant;
        await solde.save();

        res.status(200).json({
            message: 'Montant soustrait avec succès.',
            data: solde,
        });
    } catch (error) {
        console.error('Erreur lors de la soustraction du solde:', error);
        res.status(500).json({
            message: 'Une erreur est survenue.',
            error: error.message,
        });
    }
};

// Fonction pour afficher le solde actuel
const afficherSolde = async (req, res) => {
    try {
        const solde = await Solde.findOne();
        if (!solde) {
            return res.status(404).json({ message: 'Solde introuvable.' });
        }

        res.status(200).json({
            message: 'Solde récupéré avec succès.',
            solde: solde.solde,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du solde:', error);
        res.status(500).json({
            message: 'Une erreur est survenue.',
            error: error.message,
        });
    }
};

module.exports = {
    ajouterSolde,
    soustraireSolde,
    afficherSolde
};
