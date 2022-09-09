import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  id(i: number) {
    return i;
  },
  code() {
    return faker.datatype.uuid();
  },
  name() {
    return faker.name.jobArea();
  },
  expiration_date() {
    return faker.date.future();
  },
  total_uses() {
    return faker.datatype.number();
  },
  available_uses() {
    return faker.datatype.number();
  },
  status() {
    return faker.datatype.boolean();
  },
});
