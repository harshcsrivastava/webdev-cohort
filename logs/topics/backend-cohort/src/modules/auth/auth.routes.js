import { Router } from "express";
import { register } from "./auth.controller";
import validate from "../../common/middleware/validate-middleware";
import RegisterDto from "./dto/register.dto";



const router = Router()


router.post("/register", validate(RegisterDto), register)


export default router