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
    return faker.helpers.arrayElement(['M', 'F']);
  },
  cpf() {
    return faker.phone.number('###.###.###-##');
  },
  rg() {
    return faker.phone.number('#######-#');
  },
  job() {
    return faker.name.jobTitle();
  },
  department() {
    return faker.name.jobArea();
  },
  companyTime() {
    return '2 anos';
  },
  lastYearSchool() {
    return faker.phone.number('####');
  },
  code() {
    return faker.random.numeric(6);
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
  address() {
    return {
      cep: '99999-999',
      street: 'Av. teste',
      district: 'lol',
      complement: '2200',
      city: 'teste',
      uf: 'SP',
    };
  },
});
