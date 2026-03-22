// Classes are your best friend

class ApiResponse{
    // static keyword make the method available to particular class only not the instance 
    static ok(res, message, data=null){
        return res.status(200).json({
            success: true,
            message,
            data
        })
    }


    static created(res, message, data=null){
        return res.status(201).json({
            success: true,
            message,
            data
        })
    }

    static noContent(res){
        return res.status(204).send()
    }
}


export default ApiResponse