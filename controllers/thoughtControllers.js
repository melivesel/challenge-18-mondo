const {User, Thought,} = require('../models');


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

        !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body); 
            const username = req.body.username;
    
            const user = await User.findOne({ username: username });
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
    },
    async updateThought(req, res) {
        try {
            const thought= await Thought.findByIdAndUpdate(req.params.thoughtId, req.body,{ new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update thought' });
        }
        },
    async deleteThought(req, res){
        try {
            const thought= await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
    
            res.status(200).json({ message: 'Thought deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete thought' });
        }
        },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
              );
        
              if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          }, 
    async deleteReaction (req, res) {
        try {
              const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { rs: { reactionId: req.body} } },
                { runValidators: true, new: true }
              )
        
              if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
          },
    
};