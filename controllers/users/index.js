import express from 'express';
import config from "config";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../../models/Users/Users.js";

const jWT = config.get("jWT_SECRET")
const router = express.Router();

// router.post("/register",async(req,res)=>{
//     try {
//         let userdata = req.body;

//         let hashpass = await bcrypt.hash(userdata.password,10)
//         userdata.password.hashpass;
//         await userModel.create(userdata);

//         console.log(hashpass);
//         res.status(200).json({message: "user added"})

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: error})
//     }
// })


router.post("/register",async(req,res)=>{
    try {
        let userdata = req.body;
        console.log(userdata);

        let hashpassword = await bcrypt.hash(userdata.password,10);
        console.log(hashpassword);
        userdata.password = hashpassword

        await userModel.create(userdata)

        res.status(200).json({msg:"new user added"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.get("/getallusers",async(req,res)=>{
    try {
        console.log("GEt all users");

        let allUsers = await userModel.find({})
        res.status(200).json(allUsers)
    } catch (error) {
        
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.get("/getone/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        let getOneData = await userModel.find({_id:userId})
        res.status(200).json(getOneData)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.put("/update/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        let userData = req.body;
        await userModel.updateOne({_id:userId},{$set:userData})
        res.status(200).json({msg:"User updated successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})


router.delete("/deleteone/:id",async(req,res)=>{
    try {
        let userId  = req.params.id;
        await userModel.deleteOne({_id:userId})
        res.status(200).json({msg: "user is deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deleteall",async(req,res)=>{
    try {
        let userId = req.params.id;
        await userModel.deleteMany({})
        console.log(userId);
        res.status(200).json({msg: "All the users are deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "user is deleted"})
    }
})

export default router