import { faker } from "@faker-js/faker";

export const generateUserRegistrationData = () => {
  const password = faker.internet.password(); 
  const unique = `${faker.person.firstName().toLowerCase()}_${faker.string.uuid().slice(0, 8)}`;

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number("###-###-####"),
    ssn: faker.string.numeric(9),
    username: unique,
    password,
    confirmPassword: password, 
  };
};



export function generateBillPaymentsData() {
const accountNumber = faker.number.int({ min: 10000, max: 99999 });
  const amount = faker.number.int({ min: 10, max: 50 }); // Generates integer between 10-50

  return {
    payeeName: faker.person.firstName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number("###-###-####"),
    accountNumber,
    verifyAccountNumber: accountNumber,
    amount
  };
}