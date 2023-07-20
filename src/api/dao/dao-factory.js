import { MongoConfig } from '../../config/mongo.config.js'

const TYPE = {
  MONGO: 'MONGO',
}

export default class PersistencesFactory {
  static async getPersistences() {
    switch (process.env.PERSISTENCE_TYPE) {

      case TYPE.MONGO:
        MongoConfig.getInstance() 
        const { default: MongoManagers } = await import('./mongo/managers/managers.js')
        return MongoManagers

      default:
        return null
    }
  }
}