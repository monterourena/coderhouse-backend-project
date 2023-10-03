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
}
