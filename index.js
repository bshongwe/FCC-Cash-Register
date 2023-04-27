function checkCashRegister(price, cash, cid) {
  const currencyUnits = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };
  
  let changeDue = cash - price;
  let totalCID = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  totalCID = Math.round(totalCID * 100) / 100;
  if (totalCID < changeDue) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (totalCID === changeDue) {
    return {status: "CLOSED", change: cid};
  } else {
    let change = [];
    cid = cid.reverse();
    for (let i = 0; i < cid.length; i++) {
      let currencyName = cid[i][0];
      let currencyTotal = cid[i][1];
      let currencyValue = currencyUnits[currencyName];
      let currencyAmount = Math.round(currencyTotal / currencyValue * 100) / 100;
      let currencyToReturn = 0;
      while (changeDue >= currencyValue && currencyAmount > 0) {
        changeDue -= currencyValue;
        changeDue = Math.round(changeDue * 100) / 100;
        currencyAmount--;
        currencyToReturn++;
      }
      if (currencyToReturn > 0) {
        change.push([currencyName, currencyToReturn * currencyValue]);
      }
    }
    if (changeDue > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    return {status: "OPEN", change: change};
  }
}
