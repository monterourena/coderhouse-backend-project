export default class FileDTO {
  constructor(file) {
    this.file = file
  }

  #setFileName = (fieldname) => {
    const nameMapper = {
      'bank-statements': 'Bank Statement',
      'identifications': 'Identification',
      'proof-of-addresses': 'Proof of Address'
    }
    return nameMapper[fieldname]
  }

  get userDocument() {
    return {
      name: this.#setFileName(this.file.fieldname),
      reference: this.file.path
    }
  }
}
