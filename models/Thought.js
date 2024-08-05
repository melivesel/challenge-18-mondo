const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {String, required: true, minlength: 1, maxlength: 280},
    createdAt: { type: Date, default: Date.now },
    username: {String, required: true},
    reactions: [reactionSchema]
});

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp) }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;