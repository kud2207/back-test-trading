const express = require('express');
const { loginUser } = require('../controller/userController');
const { getUserAlpaca , creerCollectionAlpaca, getUserAcrif,actifMaket , supprimerActif} = require('../controller/useralpaca');
const { ajouterSolde ,soustraireSolde, afficherSolde, } = require('../controller/soldealpaca');
const loginRoute = express.Router()

//http://localhost:3100/kageu...

loginRoute.post("/login", loginUser);
loginRoute.get("/user", getUserAlpaca);
loginRoute.get("/maketActif", actifMaket);

//actif
loginRoute.post("/addactif", creerCollectionAlpaca);
loginRoute.get("/affActif", getUserAcrif);


//solde
loginRoute.post("/addSolde", ajouterSolde);
loginRoute.post("/sousSolde", soustraireSolde);
loginRoute.get("/affSolde", afficherSolde);

module.exports={
    loginRoute
} 