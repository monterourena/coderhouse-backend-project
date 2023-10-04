export class UsersServices{
    constructor(manager){
        this.manager = manager
    }
    getUserBy = (param) => {
        return this.manager.getUserBy(param)
    }
    createUser = (userData) => {
        return this.manager.createUser(userData)
    }
    updateUserBy= (filters, updates) => {
        return this.manager.updateUserBy(filters, updates)
    }

    uploadDocuments = (uid, documents) => {
        return this.manager.uploadDocuments(uid, documents)
    }

    updateLastConnection = (uid)=>{
        return this.manager.updateLastConnection(uid)
    }
}