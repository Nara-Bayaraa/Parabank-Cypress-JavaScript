import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

export function expectSchema(schema, data) {
  const ok = ajv.validate(schema, data);
  expect(ok, JSON.stringify(ajv.errors, null, 2)).to.eq(true);
}
