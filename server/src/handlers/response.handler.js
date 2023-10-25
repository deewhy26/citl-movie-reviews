
const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data)
//This is a generic function that takes three parameters: the res object (which represents the HTTP response), an HTTP status code (statusCode), and some data.
//It sets the HTTP status code using res.status(statusCode) and sends a JSON response with the provided data using res.json(data).


const error = (res) => responseWithData(res, 500, { 
    status: 500, 
    message: "Something went wrong"
}); 

const badrequest = (res, message) => responseWithData(res, 400, { 
    status: 400, 
    message
}) 
const ok = (res,data) => responseWithData(res, 200, data);
const created = (res,data) => responseWithData(res, 201, data);

const unauthorize = (res) => responseWithData(res, 401, { 
    status: 401, 
    message: "Unauthorized, go away!"
}); 

const notfound = (res) => responseWithData(res, 404, { 
    status: 404, 
    message: "Resource not found"
}); 

//Express.js doesn't automatically handle custom error responses; you need to define how to respond to errors in your routes
export default {error,badrequest, ok, created, unauthorize, notfound}