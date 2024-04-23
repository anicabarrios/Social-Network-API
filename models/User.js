const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    { 
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

// Virtual for friendCount
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;