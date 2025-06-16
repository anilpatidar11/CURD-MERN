const express = require('express');
const router = express();

const userController = require('../controllers/userController')

router.post('/add', userController.addUser)
router.get('/get', userController.viewAlluser)



router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);



module.exports = router;