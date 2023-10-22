//this file handles requests to middleware
import {validationResult} from "express-validator"
const validate = (req, res, next) => { 
    //validate request message
    const errors = validationResult(req)
    //return bad request if errors with req- return error message as json too
    if (!errors.isEmpty()) return res.status(400).json(errors.array()[0].msg);
}; 
export default validate;