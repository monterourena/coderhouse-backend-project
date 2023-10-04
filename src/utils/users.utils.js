
class UsersUtils {
    constructor(user){
        this.user = user
    }

    get hasValidDocuments () {
        const requiredDocuments = new Set(["Identification", "Proof of Address", "Bank Statement"]);
        const documents = this.user.documents
        const documentNames = new Set(documents.map(document => document.name))
        return [...requiredDocuments].every(requiredDocument => documentNames.has(requiredDocument));
    }
}

const instance = (user) => new UsersUtils(user)

export default instance