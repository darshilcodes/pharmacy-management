import { Router } from "express";
import { changePassword1, changePassword2, changePassword3, phLogin } from "../controllers/phController.js";

const phRouter = Router();

phRouter.post('/login',phLogin)
phRouter.post('/forgot-password1',changePassword1)
phRouter.post('/forgot-password2',changePassword2)
phRouter.post('change-password',changePassword3)


export default phRouter;