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
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.status(200).json(updatedUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
            
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            await Thought.deleteMany({ userId: req.params.userId });
    
            res.status(200).json({ message: 'User and associated thoughts deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete user and associated thoughts' });
        }
    },
    async addFriend(req, res) {
        try {
            // Find the user by userId
            const user = await User.findById(req.params.userId);
    
            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            // Add the friendId to the user's friends array
            user.friends.push(req.params.friendId);
    
            // Save the updated user document
            await user.save();
    
            // Return the updated user object in the response
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
};


