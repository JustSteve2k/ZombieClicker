// Used for adding money buttons.  Mostly for testing.
export function AddMoney(amount: number) {
  let currency = document.getElementById("currency");
  if (currency != null) {
    let value = parseInt(currency.innerText);
    value += amount;

    currency.innerText = value.toString();
  }
}

// Placeholder function.
export function NotReady() {
  alert("This function is not implemented yet.");
}
