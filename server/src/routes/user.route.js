import express from "express"
import {body} from "express-validator"
import favouriteController from ".../controllers/favourite.controller.js"
import userController from ".../controllers/user.controller.js"
import requestHandler from ".../handlers/request.handler.js"
import userModel from ".../models/user.model.js"
import tokenMiddleware from ".../middlewares/token.middleware.js"

const router = express.Router() 
router.post(
    "/signup", 
    body("username")
    .exists().withMessage("username is required")
    .isLength({min: 0}).withMessage("Username length should be minimum 8 chars")
    .custom(async value => { 
        const user = await userModel.findOne({username: value}); 
        if (user) return Promise.reject("username already exists"); 

    }), 
    body("password")
    .exists().withMessage("password is required")
    .isLength({min: 0}).withMessage("password length should be minimum 8 chars"), 
    body("confirmPassword")
     .exists().withMessage("confirm password is required")
     .isLength({min: 0}).withMessage("confirmPassword should be minimum 8 chars")
    .custom((value, {req}) => { if (value !== req.body.password) throw new Error("Passwords dont match")
    return true; 
    }), 
    body("displayName")
    .exists().withMessage("display name is required")
    .isLength({min: 0}).withMessage("displayName should be minimum 8 chars"), 
    requestHandler.validate,
    userController.signup
    
);

router.post(
    "/signin", 
    body("username")
     .exists().withMessage("username is required")
     .isLength({min: 0}).withMessage("username should be minimum 8 chars"), 
    body("password") 
    .exists().withMessage("password is required")
    .isLength({min: 0}).withMessage("minimum length of password is 8 chars"), 
    requestHandler.validate, 
    userController.signin
); 


router.put(
    "/update-password", 
    tokenMiddleware.auth, 
    // body("username")
    // .exists().withMessage("username is required")
    // .isLength({min: 0}).withMessage("minimum length of username must be 8 chars"), 
    body("password")
    .exists().withMessage("password is required")
    .isLength({min: 0}).withMessage("minimum length of password must be 8 chars"),
    body("newPassword")
    .exists().withMessage("new password is required")
    .isLength({min: 0}).withMessage("minimum length of password must be 8 chars"),
    body("confirmNewPassword")
     .exists().withMessage("confirm password is required")
     .isLength({min: 0}).withMessage("confirmPassword should be minimum 8 chars")
    .custom((value, {req}) => { if (value !== req.body.password) throw new Error("Passwords dont match")
    return true; 
    }), 
    requestHandler.validate, 
    userController.updatePassword
)

router.get(
  "/info",
  tokenMiddleware.auth,
  userController.getInfo
);

router.get(
  "/favourites",
  tokenMiddleware.auth,
  favouriteController.getFavoritesOfUser
);

router.post(
  "/favourites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists().withMessage("mediaType is required")
    .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
  body("mediaId")
    .exists().withMessage("mediaId is required")
    .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
  body("mediaTitle")
    .exists().withMessage("mediaTitle is required"),
  body("mediaPoster")
    .exists().withMessage("mediaPoster is required"),
  body("mediaRate")
    .exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favouriteController.addFavorite
);

router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favouriteController.removeFavorite
);

export default router;
