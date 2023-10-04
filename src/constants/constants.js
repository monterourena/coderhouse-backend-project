const EXPRESS = {
  SERVER_CONNECTION: (PORT) => `+++ Express (Connection): Server running on port ${PORT}`
}
const MONGO = {
  ERROR: '+++ Mongo DB (Error)',
  CONNECTION: '+++ Mongo DB (Connection) : Successfully connected',
  INITIALIZATION: '+++ Mongo DB (Instance) : Successfully initialized',
  ALREADY_INITIALIZED: '+++ Mongo DB (Instance) : Instance already initialized'
}
export const STATUS_MESSAGES = {
  MONGO,
  EXPRESS
}

export const AUTH = {
  ROLES: { USER: 'user', ADMIN: 'admin', PREMIUM: 'premium' },
  PROVIDERS: { LOCAL: 'local', GITHUB: 'github' }
}

export const USERS = {
  DOCUMENTS: {
    VALID_NAMES: {
      ID: 'Identification',
      PROOF_ADDRESS: 'Proof of Address',
      BANK_STATEMENT: 'Bank Statement'
    },
    FIELD_NAMES: {
      ID: 'identifications',
      PROOF_ADDRESS: 'proof-of-addresses',
      BANK_STATEMENT: 'bank-statements'
    }
  }
}
