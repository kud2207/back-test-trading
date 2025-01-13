require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { loginRoute } = require('./routes/userRoute');
const connectMongoDB = require('./config/mongoBG');

const app = express();
app.use(cors()); 
app.use(cors({origin: true, credentials: true}));
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
connectMongoDB()
 




//routes
app.use('/kageu', loginRoute)

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
