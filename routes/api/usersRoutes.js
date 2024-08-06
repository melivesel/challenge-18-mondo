const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend
} = require('../../controllers/userControllers');


router.route('/').get(getUsers).post(createUser).delete(deleteUser);


router.route('/:userId').get(getSingleUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend)


module.exports = router;