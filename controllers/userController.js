const { Thought } = require('../models');
const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
          const userId = req.params.userId;

          const userResult = await User.deleteOne({ _id: userId });

        if (userResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        const thoughtUpdateResult = await Thought.updateMany(
            { userId: userId },
            { $pull: { thoughts: userId } }
        );

            if (thoughtUpdateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'No related thoughts found for this user!' });
        }
        res.json({ message: 'User successfully deleted!' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
},


  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
