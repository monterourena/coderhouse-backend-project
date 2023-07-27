import { faker } from "@faker-js/faker/locale/es"

export class MocksServices{
    createProduct = () => {
        const thumbnailsNumber = faker.number.int({min:0, max:6})
        let thumbnails = []
        for (let i = 0; i < thumbnailsNumber; i++) {
            thumbnails.push(faker.image.url())
            
        }
        return {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code:faker.string.alphanumeric({length: 15}),
            price:faker.commerce.price({symbol:'CRC ', min:2_000, max:500_000}),
            status:faker.datatype.boolean(),
            stock: faker.number.int({min:0, max:99}),
            category:faker.commerce.department(),
            thumbnails,
            createdAt:faker.date.past({years:2}),
            updatedAt: faker.date.recent({days:20}),
            __v: faker.number.int({min:0, max:9})

        }
    }
}