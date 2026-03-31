import jwt from 'jsonwebtoken'

interface UserTokenPayload{
    id: string
}
const JWT_SECRET = 'eda2es'

export function createUserToken(payload: UserTokenPayload){
    const token = jwt.sign(payload, JWT_SECRET)
    return token
}

export function verifyUserToken(token: string){
    try {
        const payload = jwt.verify(token, JWT_SECRET) as UserTokenPayload
        return payload
    } catch (error) {
        return null
    }
}