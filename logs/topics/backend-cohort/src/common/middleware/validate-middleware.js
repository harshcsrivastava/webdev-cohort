import ApiError from "../../utils/api-error";
const validate = (Dtoclass) => {
    // what we are receiving is Dtoclas from BaseClass

    return (req, res, next) => {
        const {errors, value} = Dtoclass.validate(req.body)
        // validate is from BaseDto

        if(errors){
            throw ApiError.badRequest(errors.join("; "))
        }

        req.body = value //vapas bhejo validated data vrna mtlb kya

        next()
    }
}

export default validate