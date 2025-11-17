import { generateTokenAndSetCookie } from "../cookie/generateTokenAndSetCookie.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signUp = async(req,res) => {
    try{
        const {name,email,password,gender,dateOfBirth,timeOfBirth,placeOfBirth,currentLocation,
            maritalStatus,religion,focusArea,purposeOfVisit} = req.body;
            
        if(!name || !email || !password || !gender || !dateOfBirth || !timeOfBirth || !placeOfBirth || !currentLocation
            || !maritalStatus || !religion || !focusArea || !purposeOfVisit){
            return res.status(400).json({message: "Please provide all required fields"});
        }
        
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth,
            timeOfBirth,
            placeOfBirth,
            currentLocation,
            maritalStatus,
            focusArea,
            religion,
            purposeOfVisit,
            authProvider: 'local',
            isProfileComplete: true
        });

        if(user){
            generateTokenAndSetCookie(user._id,res);
        }
        return res.status(201).json({user})
        
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}

// Your existing logIn function
export const logIn = async(req,res) => {
    try{
        const {email,password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message : "plz add all fields"});
        }
        
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message : "user not found"});
        }

        if(user.authProvider === 'google'){
            return res.status(400).json({message: "Please use Google login"});
        }

        const isMatch = await bcrypt.compare(password,user?.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        generateTokenAndSetCookie(user._id,res);
        
        return res.status(200).json({user});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({error : err.message}); 
    }
}

export const googleLogin = async(req, res) => {
    try {
        const { credential } = req.body;

        if(!credential){
            return res.status(400).json({message: "No credential provided"});
        }

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        // Check if user exists
        let user = await User.findOne({ email });

        if(user){
            // User exists - check auth provider
            if(user.authProvider === 'local'){
                return res.status(400).json({
                    message: "Email already registered with password. Please use regular login."
                });
            }
            
            // User exists with Google - just login
            generateTokenAndSetCookie(user._id, res);
            return res.status(200).json({ 
                user,
                isProfileComplete: user.isProfileComplete 
            });
        }

        // New Google user - create account with minimal data
        user = await User.create({
            name,
            email,
            authProvider: 'google',
            googleId,
            profilePicture: picture,
            isProfileComplete: false
        });

        generateTokenAndSetCookie(user._id, res);
        
        return res.status(201).json({ 
            user,
            isProfileComplete: false,
            message: "Please complete your profile"
        });

    } catch(error) {
        console.error("Google login error:", error);
        res.status(401).json({message: "Authentication failed"});
    }
}

export const completeProfile = async(req, res) => {
    try {
        const userId = req.user._id; // From auth middleware
        
        const {
            gender,
            dateOfBirth,
            timeOfBirth,
            placeOfBirth,
            currentLocation,
            maritalStatus,
            religion,
            focusArea,
            purposeOfVisit
        } = req.body;

        if(!gender || !dateOfBirth || !timeOfBirth || !placeOfBirth || 
           !currentLocation || !maritalStatus || !religion || !focusArea || !purposeOfVisit){
            return res.status(400).json({message: "Please provide all required fields"});
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                gender,
                dateOfBirth,
                timeOfBirth,
                placeOfBirth,
                currentLocation,
                maritalStatus,
                religion,
                focusArea,
                purposeOfVisit,
                isProfileComplete: true
            },
            { new: true }
        );

        return res.status(200).json({ 
            user,
            message: "Profile completed successfully" 
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}

export const logOut = async(req,res) => {
    try{
        res.cookie("jwt","",{
            MaxAge:1
        })
        res.status(200).json({message: "Logged out successfully"});
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Server error"});
    } 
}

export const getUser = async(req,res) => {
    try {

        const user = await User.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}