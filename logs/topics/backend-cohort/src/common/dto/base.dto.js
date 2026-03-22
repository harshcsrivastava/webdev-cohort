import Joi from "joi";

class BaseDto{
    static schema = Joi.object({}) // expectation is schema ko overwrite kr do

    // validate  method chahiye ki name email karana hai to vo kro
    

    static validate(data){
        // very specific to joi

        const {error, value} = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error){
            const errors = error.details.map((d) => d.message)
            return {errors, value: null}
        }


        return {errors:null, value}
    }


}

export default BaseDto