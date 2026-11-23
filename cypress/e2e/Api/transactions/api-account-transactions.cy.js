describe('Accounts API - Transactions', () => {
  const apiUrl = `${Cypress.env('apiUrl')}`;
  // ParaBank answers in XML unless asked for JSON, and every assertion below reads JSON.
  const headers = { Accept: 'application/json' };
  // ParaBank's date endpoints only accept MM-DD-YYYY in the URL.
  const formatDate = (date) =>
    `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

  context('GET /accounts/{accountId}/transactions', () => {
    
    it('should return all transactions for a given account', () => {
      const accountId = 12345;
      // failOnStatusCode: false lets our assertion report the real status code
      // instead of Cypress stopping with a generic request error.
      cy.api({
        method: 'GET',
        url: `${apiUrl}/accounts/${accountId}/transactions`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').and.not.be.empty;

        response.body.forEach((txn) => {
          expect(txn).to.have.all.keys('id', 'accountId', 'type', 'date', 'amount', 'description');
          expect(txn.accountId).to.eq(accountId);
          expect(['Credit', 'Debit']).to.include(txn.type);
          expect(txn.amount).to.be.a('number');
          expect(txn.date).to.be.a('number');
          expect(txn.description).to.be.a('string').and.not.be.empty;
        });
        cy.log('Transactions:', JSON.stringify(response.body));
      });
    });

    it('should return all transactions of a specific amount', () => {
      const accountId = 12345;
      const amount = 100;

      cy.api({
        method: 'GET',
        url: `${apiUrl}/accounts/${accountId}/transactions/amount/${amount}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.status).to.eq(200);

        response.body.forEach((txn) => {
          expect(txn).to.have.all.keys('id', 'accountId', 'type', 'date', 'amount', 'description');
          expect(txn.accountId).to.eq(accountId);
          expect(Number(txn.amount)).to.eq(amount);
          expect(txn.type).to.be.oneOf(['Debit', 'Credit']);
          expect(txn.date).to.be.a('number');
          expect(txn.description).to.be.a('string').and.not.be.empty;
        });
        cy.log('Filtered Transactions By Amount:', JSON.stringify(response.body));
      });
    });

    it('should return all transactions of a specific month', () => {
      const accountId = 12678;
      const month = new Date().toLocaleString('en-US', { month: 'long' });
      const transactionType = 'Debit';

      // Setup: makes a Debit today so the month query always has data.
      // No failOnStatusCode here on purpose. If setup fails, the test should stop right away.
      cy.api({
        method: 'POST',
        url: `${apiUrl}/transfer`,
        qs: { fromAccountId: accountId, toAccountId: 12345, amount: 5 },
        headers,
      });

      cy.api({
        method: 'GET',
        url: `${apiUrl}/accounts/${accountId}/transactions/month/${month}/type/${transactionType}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.greaterThan(0);

        response.body.forEach((txn) => {
          expect(txn).to.have.all.keys('id', 'accountId', 'type', 'date', 'amount', 'description');
          // ParaBank stores the date as midnight UTC, so read its month in UTC too.
          expect(new Date(txn.date).getUTCMonth()).to.eq(new Date().getMonth());
          expect(txn.date).to.be.a('number');
          expect(txn.accountId).to.eq(accountId);
          expect(txn.type).to.eq(transactionType);
          expect(txn.description).to.be.a('string').and.not.be.empty;
        });
      });
    });

    it('should return all transactions for the given account within the date range', () => {
      const accountId = 12678;
      const today = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const fromDate = formatDate(weekAgo);
      const toDate = formatDate(today);

      cy.api({
        method: 'POST',
        url: `${apiUrl}/transfer`,
        qs: { fromAccountId: accountId, toAccountId: 12345, amount: 5 },
        headers,
      });

      cy.api({
        method: 'GET',
        url: `${apiUrl}accounts/${accountId}/transactions/fromDate/${fromDate}/toDate/${toDate}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').and.not.be.empty;

        const rangeStart = new Date(weekAgo.getFullYear(), weekAgo.getMonth(), weekAgo.getDate());
        // End at midnight starting the day after toDate, so transactions later today still count.
        const rangeEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        response.body.forEach((txn) => {
          expect(txn.accountId).to.eq(accountId);
          expect(txn.date).to.be.at.least(rangeStart.getTime()).and.below(rangeEnd.getTime());
        });
      });
    });

    it('should return all transactions on a specific date for account', () => {
      const accountId = 12678;
      const today = new Date();
      const onDate = formatDate(today);

      cy.api({
        method: 'POST',
        url: `${apiUrl}/transfer`,
        qs: { fromAccountId: accountId, toAccountId: 12345, amount: 5 },
        headers,
      });

      cy.api({
        method: 'GET',
        url: `${apiUrl}accounts/${accountId}/transactions/onDate/${onDate}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').and.not.be.empty;

        // ParaBank stores only the date, as midnight UTC, not the real time of the transaction.
        const expectedDate = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

        response.body.forEach((txn) => {
          expect(txn.accountId).to.eq(accountId);
          expect(txn.date).to.eq(expectedDate);
        });
      });
    });
  });

  context('POST /transfer', () => {
    it('should successfully transfer funds', () => {
      const testData = {
        fromAccountId: 12678,
        toAccountId: 12345,
        amount: 50,
      };

      cy.api({
        method: 'POST',
        url: `${apiUrl}/transfer`,
        qs: testData,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include(
          `Successfully transferred $${testData.amount} from account #${testData.fromAccountId} to account #${testData.toAccountId}`
        );
      });
    });
  });

  context('POST /withdraw', () => {
    it('should successfully withdraw funds', () => {
      const testData = {
        accountId: 12678,
        amount: 50,
      };

      cy.api({
        method: 'POST',
        url: `${apiUrl}/withdraw`,
        qs: testData,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include(
          `Successfully withdrew $${testData.amount} from account #${testData.accountId}`
        );
      });
    });
  });
});
