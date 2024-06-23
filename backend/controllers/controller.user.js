import User from "../models/user.model.js"

export const getUsersSidebar = async(req,res)=>{
    try {
        const loggedInUserID = req.user._id
        const allUsers= await User.find()

        res.status(200).json(allUsers)
    } catch (error) {
        console.log("Error in controller user ",error.message)
        res.send(500).json({error:"Internal server error"})
    }
}