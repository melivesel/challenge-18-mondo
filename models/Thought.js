const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }]
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);