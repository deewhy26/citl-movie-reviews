import mongoose from "mongoose"
import modelOptions from "./model.options.js"
import crypto from "crypto"
const userSchema = new mongoose.Schema({ 
    username: { 
        type: String, 
        required: true, 
        unique: true
    }, 
    displayName: { 
        type: String, 
        required: true
    }, 
    password: { 
        type: String, 
        required: true
    }, 
    salt: { 
        type: String, 
        required: true
    }
}, modelOptions)

userSchema.methods.setPassword = function(password){ 
    this.salt = crypto.randomBytes(16).toString("hex")
    //gen hashed pass
    this.password = crypto.pbkdf2Sync( 
        password, 
        this.salt, 
        1000, 
        64, 
        "sha512"
    ).toString("hex")
}
userSchema.methods.validPassword = function(password){ 
    //gen hash
    const hash = crypto.pbkdf2Sync( 
        password, 
        this.salt, 
        1000, 
        64, 
        "sha512"
    ).toString("hex")
    //strict equality
    return this.password === hash;
};


const userModel = mongoose.model("User", userSchema); 
export default userModel; 