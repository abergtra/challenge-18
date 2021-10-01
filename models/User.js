//require mongoose
const { Schema, model } = require('mongoose');

//guidelines to set up models and API routes
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'What is your username?',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'What is your email address?',
            validate: {
                validator(validEmail) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(validEmail);
                },
                message: 'That email was not valid, please try again.'
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
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
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

//export model
const User = model('User', UserSchema);
module.exports = User