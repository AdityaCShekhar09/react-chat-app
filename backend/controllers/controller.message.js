import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

export const sendMessage= async(req,res)=>{
    try {
        const {message}=req.body
        const {id: receiverID}=req.params
        const senderID=req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all: [senderID, receiverID]}
        }) 

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderID,receiverID]
            })
        }

        const newMessage = new Message({
            senderID,receiverID,message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await conversation.save()
        await newMessage.save()

        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages= async(req,res)=>{
    try {
        const {id:usersToChatID}=req.params
        const senderID=req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all: [senderID, usersToChatID]}
        }).populate("messages")

        if(!conversation){
            res.status(200).json([])
        }

        const messages = conversation.messages
        res.status(200).json(messages)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:"Internal server error"})
    }
}