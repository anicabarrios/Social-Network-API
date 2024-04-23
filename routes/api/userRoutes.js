const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend, 
  removeFriend
} = require('../../controllers/userController');

// Routes for /api/users
router.route('/')
  .get(getUsers)  // GET all users
  .post(createUser); // POST to create a new user

// Routes for /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)  // GET a single user by userId
  .put(updateUser)     // PUT to update a user by userId
  .delete(deleteUser); // DELETE to remove a user by userId

// Routes for adding and removing friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)    // POST to add a friend
  .delete(removeFriend);  // DELETE to remove a friend

module.exports = router;
