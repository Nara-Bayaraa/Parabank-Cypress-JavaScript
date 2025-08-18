import { expectSchema } from '../../../support/helpers/schema';
import Position from '../../../fixtures/schemas/position.schema.json';

describe('Buy Position API - schema check', () => {
  const apiUrl = Cypress.env('apiUrl');            
  const headers = { Accept: 'application/json' };
  const customerId = 12212;

  const PositionList = { type: 'array', items: Position };

  it('should matches Position[] schema', () => {
    const buyData = {
      customerId,
      accountId: 13344,
      name: 'AMR Corporation',
      symbol: 'AMR',
      shares: 10,
      pricePerShare: 50.25
    };

 
    cy.api({
      method: 'POST',
      url: `${apiUrl}customers/${customerId}/buyPosition`,
      qs: buyData,                
      headers,
      failOnStatusCode: false
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expectSchema(PositionList, body);
      expect(body.length).to.be.greaterThan(0);
      body.forEach(p => {
        expect(p.name).to.be.a('string').and.not.be.empty;
        expect(p.symbol).to.be.a('string').and.not.be.empty;
      });
    });
  });
});
