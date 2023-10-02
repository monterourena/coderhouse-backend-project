import { v4 } from 'uuid'

class UUID{
    generate = () => v4()
}

const uuidInstance = new UUID()

export default uuidInstance