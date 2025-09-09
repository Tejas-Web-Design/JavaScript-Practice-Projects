let price = 19.5; // Can change this for testing
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
];

const currencyUnit = {
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

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cashInput = document.getElementById("cash").value;
  const changeDue = document.getElementById("change-due");

  const cash = parseFloat(cashInput);

  if (isNaN(cash)) {
    alert("Please enter a valid number");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return;
  }

  const result = checkCashRegister(price, cash, cid);

  if (result.status === "INSUFFICIENT_FUNDS") {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if (result.status === "CLOSED") {
    const changeStr = result.change
      .filter(([_, amount]) => amount > 0)
      .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
      .join(" ");
    changeDue.innerText = `Status: CLOSED ${changeStr}`;
  } else if (result.status === "OPEN") {
    const changeStr = result.change
      .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
      .join(" ");
    changeDue.innerText = `Status: OPEN ${changeStr}`;
  }
});

function checkCashRegister(price, cash, cid) {
  let changeDue = parseFloat((cash - price).toFixed(2));
  const originalCid = JSON.parse(JSON.stringify(cid)); // Deep copy
  const change = [];

  // Reverse for highest to lowest
  cid = cid.reverse();

  for (let [unit, amount] of cid) {
    const unitValue = currencyUnit[unit];
    let used = 0;

    while (changeDue >= unitValue && amount > 0) {
      changeDue = parseFloat((changeDue - unitValue).toFixed(2));
      amount = parseFloat((amount - unitValue).toFixed(2));
      used = parseFloat((used + unitValue).toFixed(2));
    }

    if (used > 0) {
      change.push([unit, used]);
    }
  }

  const totalChange = change.reduce((sum, [_, amount]) => sum + amount, 0);
  const totalCid = originalCid.reduce((sum, [_, amount]) => sum + amount, 0);

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (parseFloat((totalChange).toFixed(2)) === parseFloat((totalCid).toFixed(2))) {
    return { status: "CLOSED", change: originalCid };
  }

  return { status: "OPEN", change };
}
