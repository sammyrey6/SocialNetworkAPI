const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userSchema: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }]
    });

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});



const User = model('User', userSchema)

module.exports = User
