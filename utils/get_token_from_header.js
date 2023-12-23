export const get_token_from_header = (req) => {

    // get token from header
    const headerObject = req?.headers;
    const tokenArray = headerObject?.authorization?.split(" ")

    if (tokenArray === undefined) {
        return 'No Token found in token'
    }

    const bearerToken = tokenArray[0];
    const token = tokenArray[1];

    if (token === undefined) {
        return 'No Token found in token'
    } else {
        return token
    }
}