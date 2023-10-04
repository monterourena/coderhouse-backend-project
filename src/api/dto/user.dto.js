export default class UserDTO {
  constructor(user) {
    this.user = user
  }

  #parseName(name) {
    return name.split(' ')[0]
  }

  get data() {
    return {
      name: this.#parseName(this.user.name),
      email: this.user.email,
      role: this.user.role,
      cart: this.user.cart
    }
  }

  get emailOnly() {
    return {
      email: this.user.email
    }
  }

  get nameEmailRole(){
    return {
      name: this.user.first_name,    
      email: this.user.email,
      role: this.user.role
    }
  }

  get passportNewUser() {
    return {
      id: this.user._id,
      name: `${this.user.first_name} ${this.user.last_name}`,
      email: this.user.email,
      role: this.user.role,
      cart: this.user.cart
    }
  }
}
