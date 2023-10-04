import { USERS } from "../constants/constants.js";

class UsersUtils {
    constructor(user){
        this.user = user
    }

    get hasValidDocuments () {
        const VN = USERS.DOCUMENTS.VALID_NAMES
        const requiredDocuments = new Set([VN.ID, VN.PROOF_ADDRESS, VN.BANK_STATEMENT]);
        const documents = this.user.documents
        const documentNames = new Set(documents.map(document => document.name))
        return [...requiredDocuments].every(requiredDocument => documentNames.has(requiredDocument));
    }
}

const instance = (user) => new UsersUtils(user)

export default instance