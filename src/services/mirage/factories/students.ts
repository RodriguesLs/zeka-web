import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  id(i: number) {
    return i;
  },
  name() {
    return faker.name.fullName();
  },
  gender() {
    return faker.name.gender(true);
  },
  cpf(i: number) {
    return i;
  },
  code(i: number) {
    return 'A' + i;
  },
  email() {
    return faker.internet.email();
  },
  phone() {
    return faker.phone.number('(00) #####-####');
  },
  active() {
    return faker.datatype.boolean();
  },
});
