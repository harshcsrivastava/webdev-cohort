import { Router } from "express";
import validate from "../../common/middleware/validate-middleware";
import RegisterDTO from "./dto/register.dto";
import { register } from "./auth.controller.js";

const routes = Router()

routes.post("/register", validate(RegisterDTO), register)

export default routes