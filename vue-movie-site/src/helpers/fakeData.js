import { faker } from '@faker-js/faker';

export const fakeList = (dates, count = 1000) => {
    const res = [];
    for (let i = 0; i < count; i +=1) {
        res.push({
            id: i,
            title: `JET ${faker.random.word()}`,
            dates: dates,
            image: faker.image.image(),
        });
    }
    return res;
}