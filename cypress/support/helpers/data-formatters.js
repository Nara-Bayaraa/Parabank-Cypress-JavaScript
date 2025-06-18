

// Formats an account object into  expected shape
export function buildExpectedAccount(account, balance, availableAmount) {
  return {
    accountNumber: account.accountNumber,
    balance: `$${balance.toFixed(2)}`,
    availableAmount: `$${availableAmount.toFixed(2)}`,
  };
}
// Builds an array of expected account objects from a list
export function buildExpectedAccounts(accountList) {
  return accountList.map(({ accountNumber, balance, availableAmount }) =>
    buildExpectedAccount(accountNumber, balance, availableAmount)
  );
}

//string-to-number formatter
export function parseValue(valueStr) {
  return parseFloat(valueStr.replace(/[^0-9.-]+/g, ""));
}
