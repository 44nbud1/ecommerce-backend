import {get_token_from_header} from "../utils/get_token_from_header.js";
import {verifyToken} from "../utils/verify_token.js";

export const isLoggedIn = (req, res, next) => {
    // get token from header
    const token = get_token_from_header(req)

    // verify token
    const decodedUser = verifyToken(token)

    if (!decodedUser) {
        throw new Error('Invalid/Expired token, please login again')
    } else {

        // save the user into req obj
        req.userAuthId = decodedUser?.id;
        next();
    }

}