//require mongoose
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//guidelines to set up reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: 'Share your Reactions!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'What is your username?',
            trim: true
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            getters: true
        },
    }
);

//guidelines to set up thought schema
const ThoughtSchema = new Schema(
    {
        ThoughtSchema: {
            type: String,
            required: 'Share your thoughts!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



//Schema settings
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

//export model
const Thought = model('Thought', ThoughtSchema)
module.exports = Thought