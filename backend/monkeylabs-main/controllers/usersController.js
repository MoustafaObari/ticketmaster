const Users = require('../models/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const venues = await Users.find({});
        res.status(200).json(venues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching users.' });
    }
};

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await Users.findOne({ username });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);

        // Log the stack trace
        console.error(error.stack);

        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const getUserById = async (req, res) => {
    const usersId = req.params.id;

    try {
        const users = await Users.findById(usersId);

        if (!users) {
            return res.status(404).json({ message: 'User ID not found.' });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching userid.' });
    }
};


const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUsers = new Users({
            username,
            email,
            password: hashedPassword,
        });

        const savedUsers = await newUsers.save();

        res.status(201).json(savedUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding users.' });
    }
};

const updateUser = async (req, res) => {
    const usersId = req.params.id;
    let update = { ...req.body };

    // Check if the password is part of the update and hash it
    if (update.password) {
        try {
            update.password = await bcrypt.hash(update.password, 10); // 10 is the salt rounds
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error hashing password.' });
        }
    }

    try {
        const updatedUsers = await Users.findByIdAndUpdate(usersId, update, { new: true, runValidators: true });

        if (!updatedUsers) {
            return res.status(404).json({ message: 'Users not found.' });
        }

        res.status(200).json(updatedUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while updating users.' });
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        const users = await Users.deleteMany({});
        res.status(200).json({ message: 'All users successfully deleted.', deletedUsers: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while deleting users.' });
    }
};

const deleteUser = async (req, res) => {
    const usersId = req.params.id;

    try {
        const deletedUsers = await Users.findByIdAndDelete(usersId);

        if (!deletedUsers) {
            return res.status(404).json({ message: 'Users not found.' });
        }

        res.status(200).json({ message: 'User successfully deleted.', deletedUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while deleting users.' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        req.session.userId = user._id.toString();
        console.log("req session user", req.session.userId)

        req.session.save(function(err){
            if(err){
                console.log(err)
                res.status(500).json({ message: 'Server error while logging in user.' });
            }
            res.status(200).json({ message: 'User successfully logged in.', user });
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while logging in user.' });
    }
}

const logoutUser = async (req, res) => {
    req.session.destroy();

    res.status(200).json({ message: 'User successfully logged out.' });
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
    loginUser,
    logoutUser,
}
