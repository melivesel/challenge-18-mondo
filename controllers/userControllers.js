const {User, Thought} = require('../models');


module.exports = {
    async getUsers(req, res) {
        try {
            const result = await User.find({});
            res.status(200).json(result);
        } catch (err) {
            console.log('Users not found');
            res.status(500).json({error: 'Something went wrong'});
    
    }
},
    async getSingleUser(req, res) {
        try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user); // Return the created user in the response
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

};


// app.post();

// app.put();

// app.delete();