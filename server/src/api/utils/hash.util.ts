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

const CompareHashes = async (plaintext: string, hashedString: string) => {

    try {

        if (!plaintext) throw new Error("plaintext was not provided");
        if (!hashedString) throw new Error("hashedString was not provided");

        return await bcrypt.compare(plaintext, hashedString);

    } catch (error) {
        HandleError(undefined, { error: error });
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {
    HashText,
    CompareHashes
}