require('dotenv').config()

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(cors({
    origin: frontendUrl,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET, // Secret key to sign the session ID cookie (use a .env variable)
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Don't create session until something stored
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        httpOnly: true, // Prevents client-side JS from reading the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (requires HTTPS)
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (in milliseconds)
    },
}));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DressStore application.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const categoriesRoutes = require('./routes/categoriesRoutes');
const eventCategoriesRoutes = require('./routes/eventCategoryRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const orderItemsRoutes = require('./routes/orderItemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const venuesRoutes = require('./routes/venueRoutes');

app.use(categoriesRoutes);
app.use(eventCategoriesRoutes);
app.use(eventsRoutes);
app.use(orderItemsRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);
app.use(ticketRoutes);
app.use(userRoutes);
app.use(venuesRoutes);