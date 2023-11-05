import userModel from "../models/user.model.js";
import jsobwebtoken from "jsobwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => { 
    try{ 
        const {username, password, displayName} = req.body; 
         
        const checkUser = await userModel.findOne({username}); 
        if (checkUser) responseHandler.badrequest(res, "Username already exists"); 
        const user = new userModel();

        user.username = username; 
        user.setPassword(password); 
        await user.save();
        const token = jsobwebtoken.sign(
            {data: user.id}, 
            process.env.TOKEN_SECRET,
            {expiresIn: "24h"}
        )
        responseHandler.created(res, 
            { 
                token, 
                ...user._doc,
                id: user.id


            });
    }
    catch{ 
        responseHandler.error(res)
    }
}
const signin = async (req, res) => { 
    const {username, password} = req.body; 
    const user = await userModel.findOne({username}).select("Username or Password entered is incorrect"); 
    if (!user) return responseHandler.badrequest(res, "User does not exist...Register");
    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Username or Password entered is incorrect");

    user.password = undefined;
    user.salt = undefined;
    const token = jsobwebtoken.sign(
            {data: user.id}, 
            process.env.TOKEN_SECRET,
            {expiresIn: "24h"}
        )
        responseHandler.created(res, 
            { 
                token, 
                ...user._doc,
                id: user.id


            });
const updatePassword = async (req, res) => { 
    try{ 
        const {password, newPassword} = req.body; 
        const user = await userModel.findOneById(req.user.id).select("password id salt"); 
        if (!user) return responseHandler.unauthorize(res); 
        if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password"); 
        user.setPassword(newPassword)
        await user.save() 
        responseHandler.ok(res);
    }
    catch{ 
        responseHandler.error(res);
    }
const getInfo = async (req, res) => { 
    try{ 
        const user = await userModel.findById(req.user.id); 
        if (!user) return responseHandler.notfound(res); 
        responseHandler.ok(res, user);
    }
    catch{ 
        responseHandler.error(res); 
    }
}
}

}
export default { 
    signin, 
    signup,
    getInfo, 
    updatePassword
}