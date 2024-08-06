const {User, Thought} = require('../models');


module.exports = {
    async getThoughts(req, res) {
        try {
            const result = await Thought.find({});
            res.status(200).json(result);
        } catch (err) {
            console.log('Thoughts not found');
            res.status(500).json({error: 'Something went wrong'});
    
    }
    },
    async getSingleThought(req, res) {
        try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

        !user
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body); // Create the new thought
            const userId = req.body.userId; // Assuming userId is sent in the request body
    
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            user.thoughts.push(thought._id);
    
            await user.save();
    
            res.status(201).json(thought); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create thought' });
        }
    }
};