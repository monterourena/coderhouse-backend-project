export class UsersServices{
    constructor(manager){
        this.manager = manager
    }
    getAllUsers = (projection) => {
        return this.manager.getAllUsers(projection)
    }
    deleteInactiveUsers = (inactivityInMinutes) => {
        return this.manager.deleteInactiveUsers(inactivityInMinutes)
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

    updateUserRole = (uid, role) => {
        return this.manager.updateUserRole(uid, role)
    }

    uploadDocuments = (uid, documents) => {
        return this.manager.uploadDocuments(uid, documents)
    }

    updateLastConnection = (uid)=>{
        return this.manager.updateLastConnection(uid)
    }
}