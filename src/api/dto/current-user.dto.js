export default class CurrentUserDTO {
    constructor(user) {
      this.name = this.#parseName(user.name)
      this.email = user.email
      this.role = user.role
      this.cart = user.cart
    }

    #parseName(name){
        return name.split(' ')[0]
    }

    get data() {
      return {
        name: this.name,
        email: this.email,
        role: this.role,
        cart: this.cart
      }
    }
  }
  