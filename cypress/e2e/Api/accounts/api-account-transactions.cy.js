describe("Accounts API - Transactions", () => {
  const apiUrl = `${Cypress.env("apiUrl")}`;
  const headers = { Accept: "application/json" };

  context("GET /accounts/{accountId}/transactions", () => {
    it("should return all transactions for a given account", () => {
      const accountId = 12345;
      cy.api({
        method: "GET",
        url: `${apiUrl}/accounts/${accountId}/transactions`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array").and.not.be.empty;
        expect(response.body.length).to.be.greaterThan(0);

        response.body.forEach((txn) => {
          expect(txn).to.have.all.keys(
            "id",
            "accountId",
            "type",
            "date",
            "amount",
            "description"
          );
          expect(txn.accountId).to.eq(accountId);
          expect(["Credit", "Debit"]).to.include(txn.type);
          expect(txn.amount).to.be.a("number");
          expect(txn.date).to.be.a("number");
          expect(txn.description).to.be.a("string").and.not.be.empty;
        });
        cy.log("Transactions:", JSON.stringify(response.body));
      });
    });

    it("should return all transactions of a specific amount", () => {
      const accountId = 12345;
      const amount = 100;

      cy.api({
        method: "GET",
        url: `${apiUrl}/accounts/${accountId}/transactions/amount/${amount}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.status).to.eq(200);

        response.body.forEach((txn) => {
          expect(txn).to.have.all.keys(
            "id",
            "accountId",
            "type",
            "date",
            "amount",
            "description"
          );
          expect(txn.accountId).to.eq(accountId);
          expect(Number(txn.amount)).to.eq(amount);
          expect(txn.type).to.be.oneOf(["Debit", "Credit"]);
          expect(txn.date).to.be.a("number");
          expect(txn.description).to.be.a("string").and.not.be.empty;
        });
        cy.log(
          "Filtered Transactions By Amount:",
          JSON.stringify(response.body)
        );
      });
    });

    it("should return all transactions of a specific month", () => {
      const accountId = 12678;
      const month = "July";
      const transactionType = "Debit";
      cy.api({
        method: "GET",
        url: `${apiUrl}/accounts/${accountId}/transactions/month/${month}/type/${transactionType}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.greaterThan(0);

        response.body.forEach((txn) => {
          expect(txn).to.have.all.keys(
            "id",
            "accountId",
            "type",
            "date",
            "amount",
            "description"
          );
          expect(new Date(txn.date).getMonth()).to.eq(6);
          expect(txn.date).to.be.a("number");
          expect(txn.accountId).to.eq(accountId);
          expect(txn.type).to.eq(transactionType);
          expect(txn.description).to.be.a("string").and.not.be.empty;
        });
      });
    });

    it("should return all transactions for the given account within the date range", () => {
      const accountId = 12678;
      const fromDate = "07-01-2025";
      const toDate = "07-31-2025";
      cy.api({
        method: "GET",
        url: `${apiUrl}accounts/${accountId}/transactions/fromDate/${fromDate}/toDate/${toDate}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body).to.be.an("array");
        response.body.forEach((txn) => {
          expect(txn.accountId).to.eq(accountId);
          const txnDate = new Date(txn.date);
          expect(txnDate >= new Date(fromDate)).to.be.true;
          expect(txnDate <= new Date(toDate)).to.be.true;
        });
      });
    });

    it("should return all transactions on a specific date for account", () => {
      const accountId = 12345;
      const onDate = "07-17-2025";

      cy.api({
        method: "GET",
        url: `${apiUrl}accounts/${accountId}/transactions/onDate/${onDate}`,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.greaterThan(0);
        expect(response.body).to.be.an("array");

        const expectedDate = new Date(onDate);
        response.body.forEach((txn) => {
          const txnDate = new Date(txn.date);
          expect(txn.accountId).to.eq(accountId);
          expect(txnDate.getFullYear()).to.eq(expectedDate.getFullYear());
          expect(txnDate.getMonth()).to.eq(expectedDate.getMonth());
        });
      });
    });
  });

  context("POST /transfer", () => {
    it("should successfully transfer funds", () => {
      const testData = {
        fromAccountId: 12678,
        toAccountId: 12345,
        amount: 50,
      };

      cy.api({
        method: "POST",
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

  context("POST /withdraw", () => {
    it.only("should successfully withdraw funds", () => {
      const testData = {
        accountId: 12678,
        amount: 50,
      };

      cy.api({
        method: "POST",
        url: `${apiUrl}/withdraw`,
        qs: testData,
        headers,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status === 'success')
        expect(response.body).to.include(
          `Successfully withdrew $${testData.amount} from account #${testData.accountId}`
        );
      });
    });
  });
});
