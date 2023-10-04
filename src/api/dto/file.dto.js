import { USERS } from "../../constants/constants.js"

export default class FileDTO {
  constructor(file) {
    this.file = file
  }

  #setFileName = (fieldname) => {
    // This function converts the field name to a more suitable file name if it has been defined

    const VN = USERS.DOCUMENTS.VALID_NAMES
    const FN = USERS.DOCUMENTS.FIELD_NAMES
    const nameMapper = {
      [FN.BANK_STATEMENT]: VN.BANK_STATEMENT,
      [FN.ID]: VN.ID,
      [FN.PROOF_ADDRESS]: VN.PROOF_ADDRESS
    }
    return nameMapper[fieldname]
  }

  get userDocument() {
    return {
      name: this.#setFileName(this.file.fieldname) || this.file.fieldname,
      reference: this.file.path
    }
  }
}
