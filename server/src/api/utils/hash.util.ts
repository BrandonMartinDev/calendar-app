// -- == [[ IMPORTS ]] == -- \\

// Config
import { BCRYPT_SALT_ROUNDS } from '@config/defaults.config';


// Packages
import bcrypt from 'bcrypt';


// Utils
import HandleError from "@utils/handleError.util"



// -- == [[ METHODS ]] == -- \\

const HashText = async (plaintext: string) => {

    try {

        if (!plaintext) throw new Error("plaintext was not provided");

        const hashedText = await bcrypt.hash(plaintext, BCRYPT_SALT_ROUNDS);
        return hashedText;

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    HashText
}