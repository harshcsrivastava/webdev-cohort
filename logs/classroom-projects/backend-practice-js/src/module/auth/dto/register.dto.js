import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto";

class RegisterDTO extends BaseDTO {
    // name, email, password, role
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password:Joi.string().min(8).message("Password should be atleast 8 characters").required(),
        role: Joi.string().valid("customer", "seller").default("customer")
    });
}

export default RegisterDTO