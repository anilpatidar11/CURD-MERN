 const UserSchemaModel = require('../models/userModel')


const addUser = async (req, res) => {
  
  const userDetails = req.body;

  try {
    const user = await UserSchemaModel.create(userDetails)
return res.status(201).json({status: true ,user})
  }
  catch (err) {
    return res.status(500).json({status: false ,err:err.message})

  }


}



const viewAlluser = async (req, res) => {
  
  try {
    const users = await UserSchemaModel.find()
return res.status(201).json({status: true ,users})
  }
  catch (err) {
    return res.status(500).json({status: false ,err:err.message})

  }


}


// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
  
    const id = req.params.id;

    const deletedUser = await UserSchemaModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    return res.status(200).json({ status: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};







// Update a user by ID
const updateUser = async (req, res) => {
  try {

    const id = req.params.id;
    const edituser = req.body;
    
    const updatedUser = await UserSchemaModel.findByIdAndUpdate(id, edituser, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({ status: true, user: updatedUser });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};








module.exports = {

  addUser,
  viewAlluser,
  deleteUser,
  updateUser
}