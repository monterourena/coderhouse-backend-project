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
}