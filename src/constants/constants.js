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
