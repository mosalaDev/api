require('dotenv').config({
    path: './config/config.env'
});
const express = require('express');
const morgan = require('morgan');
const app = express();
const db = require('./models');
const passport = require('passport');
require('./config/passport')(passport);
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const zoneRoutes = require('./routes/zone');
const serviceRoutes = require('./routes/service');
const gammeRoutes = require('./routes/gammeTravaux');
const travailRoutes = require('./routes/travail');
const materielRoutes = require('./routes/material');
const materielSpecRoutes = require('./routes/spec');
const technicianRoutes = require('./routes/artisan');
const affectationRoutes = require('./routes/affectation');
const reservationRoutes = require('./routes/reservation');
const prestationRoutes = require('./routes/prestation');
const catTravailRoutes = require('./routes/categorieTravail');
const emailRoutes = require('./routes/email');

const errorHandlers = require('./controllers/errors/index');
const middlewares = require('./middlewares/authorization');

db.sequelize.sync({ force: false });
const SequelizeStore = require('connect-session-sequelize')(session.Store);

/**
 * App Middlewares 
 */
app.use(cors({ credentials: true, origin: '*' }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
        db: db.sequelize
    }),
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(middlewares.set_req_user);

app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Routes Middlewares
 */
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/zone', zoneRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/gamme_travaux', gammeRoutes);
app.use('/api/travail', travailRoutes);
app.use('/api/materiel', materielRoutes);
app.use('/api/materiel_spec', materielSpecRoutes);
app.use('/api/technicien', technicianRoutes);
app.use('/api/affectation', affectationRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/prestation', prestationRoutes);
app.use('/api/categorie_travail', catTravailRoutes);
app.use('/api/email_registry', emailRoutes);

/**
 * Error handlers
 */
app.use("/api/*", errorHandlers.route_not_found);
app.use("/api/*", errorHandlers.error_handler);

app.use("*", (req, res) => {
    return res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

/**
 * Start the server 
 */
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server is listning on port ${PORT}`));

module.exports = app;