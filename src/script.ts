var interval = 0;
let count = 0;
let level = 0;

// Event listeners
document.getElementById("tank")?.addEventListener("click", UpdateCountV2);

// Placeholder function.
function NotReady() {
  alert("This function is not implemented yet.");
}

// Used for manual clicks.  Should probably have a better name.
function UpdateCountV2() {
  let clicks = document.getElementById("clicks");
  let zombies = document.getElementById("zombies");

  if (clicks != null && zombies != null) {
    let clicksValue = parseInt(clicks.innerText);
    let zombiesValue = parseInt(zombies.innerText);

    zombiesValue--;
    clicksValue++;

    clicks.innerText = clicks.toString();
    zombies.innerText = zombies.toString();
  }
}

// Used for adding money buttons.  Mostly for testing.
function AddMoney(amount: number) {
  let currency = document.getElementById("currency");
  if (currency != null) {
    let value = parseInt(currency.innerText);
    value += amount;

    currency.innerText = currency.toString();
  }
}

// Updates count of new unit
function PurchaseUnit(unit: string) {
  let currency = document.getElementById("currency");
  let amountOfUnits = document.getElementById(unit);
  let autoClicks = document.getElementById("autoClicks");

  if (currency != null && amountOfUnits != null && autoClicks != null) {
    let currencyValue = parseInt(currency.innerText);
    let amountOfUnitsValue = parseInt(amountOfUnits.innerText);
    let unitCost = 0;

    // Determines unit cost.
    unitCost = parseInt(document.getElementsByClassName(unit + "Cost")[0].innerHTML);

    // Checks to see if you have enough currency to purchase unit.  If so, subtracts costs then updates new unit price.
    if (currencyValue >= unitCost) {
      amountOfUnitsValue++;
      currencyValue -= unitCost;

      amountOfUnits.innerText = amountOfUnitsValue.toString();
      currency.innerText = currency.toString();

      // Sets multiple intervals.  Needs to be refactored.
      // Instead of having separte interval for each unit.  Need to combine the autoclicks and set interval based off that.
      // get how many of each unit we have*their point value.  Add them up then set one interval based off that.
      let infantrymen = parseInt(document.getElementById("infantrymen")!.innerText);
      let machineguns = parseInt(document.getElementById("machineguns")!.innerText);
      let turrets = parseInt(document.getElementById("turrets")!.innerText);
      let cannons = parseInt(document.getElementById("cannons")!.innerText);
      let gunships = parseInt(document.getElementById("gunships")!.innerText);
      let battleships = parseInt(document.getElementById("battleships")!.innerText);
      let sateliteguns = parseInt(document.getElementById("sateliteguns")!.innerText);
      let spaceships = parseInt(document.getElementById("spaceships")!.innerText);

      let autoclicksValue =
        infantrymen * 1 + machineguns * 2 + turrets * 4 + cannons * 8 + gunships * 16 + battleships * 32 + sateliteguns * 64 + spaceships * 128; // Update with more units later.

      console.clear();
      console.log(`Unit cost - ${unitCost}`);
      console.log(`autoclicks - ${autoclicksValue}`);
      console.log(`Infantrymen - ${infantrymen}`);
      console.log(`machineguns - ${machineguns}`);
      console.log(`turrets - ${turrets}`);
      console.log(`cannons - ${cannons}`);
      console.log(`gunships - ${gunships}`);
      console.log(`battleships - ${battleships}`);
      console.log(`sateliteguns - ${sateliteguns}`);
      console.log(`spaceships - ${spaceships}`);

      UpdateAutoclicker(autoclicksValue);
      UpdateUnitCost(unit);

      autoClicks.innerText = autoclicksValue.toString();
    } else alert("not enough money for " + unit);
  }
}

function GetValues() {
  const values = { infantrymen: 0, machineguns: 0, turrets: 0, cannons: 0, gunships: 0, sateliteguns: 0, spaceships: 0 };

  values.infantrymen = parseInt(document.getElementById("infantrymen")!.innerText);
  values.machineguns = parseInt(document.getElementById("machineguns")!.innerText);
  /*
  values.turrets = parseInt(document.getElementById("turrets")!.innerText);
  values.cannons = parseInt(document.getElementById("cannons")!.innerText);
  let gunships = parseInt(document.getElementById("gunships")!.innerText);
  let battleships = parseInt(document.getElementById("battleships")!.innerText);
  let sateliteguns = parseInt(document.getElementById("sateliteguns")!.innerText);
  let spaceships = parseInt(document.getElementById("spaceships")!.innerText);
  */
  return values;
}

// Order this needs to happen.  take cost from button.  Subtract from currency.  then calculate new cost and append button.
function UpdateUnitCost(unit: string) {
  var unitCost = 0;

  let amountOfUnits = document.getElementById(unit);
  if (amountOfUnits != null) {
    let amountOfUnitsValue = parseInt(amountOfUnits.innerText);
    let difficultyModifier = 1.2; // Formula to determine scaling needs to be reworked

    switch (unit) {
      case "infantrymen":
        unitCost = 10 + Math.pow(1 + amountOfUnitsValue, difficultyModifier);
        break;
      case "machineguns":
        unitCost = 20 + Math.pow(2 + amountOfUnitsValue, difficultyModifier);
        break;
      case "turrets":
        unitCost = 40 + Math.pow(4 + amountOfUnitsValue, difficultyModifier);
        break;
      case "cannons":
        unitCost = 80 + Math.pow(8 + amountOfUnitsValue, difficultyModifier);
        break;
      case "gunships":
        unitCost = 160 + Math.pow(16 + amountOfUnitsValue, difficultyModifier);
        break;
      case "battleships":
        unitCost = 320 + Math.pow(32 + amountOfUnitsValue, difficultyModifier);
        break;
      case "sateliteguns":
        unitCost = 640 + Math.pow(64 + amountOfUnitsValue, difficultyModifier);
        break;
      case "spaceships":
        unitCost = 1280 + Math.pow(128 + amountOfUnitsValue, difficultyModifier);
        break;
    }

    unitCost = Math.floor(unitCost);
    document.getElementsByClassName(unit + "Cost")[0].innerHTML = unitCost.toString();
  }
}

// Isue here is with calc being done in the interval
function UpdateAutoclicker(autoclicks: number) {
  let currency = document.getElementById("currency");
  let currencyValue = 0;

  if (currency != null) {
    clearInterval(interval);

    interval = setInterval(() => {
      currencyValue = parseInt(currency!.innerText);
      currencyValue += autoclicks;
      currency!.innerText = currencyValue.toString();
    }, 1000);
  }
}

// elem may not be HTML element so watch for that.
function BuyBuff(elem: HTMLElement, cost: number) {
  let currency = document.getElementById("currency");
  let currencyValue = 0;

  if (currency != null) {
    currencyValue = parseInt(currency.innerText);
    // Check if enough currency.

    if (currencyValue >= cost) {
      elem.style.backgroundColor = "red";
      elem.style.border = "1px solid white";
      return;
    } else {
      alert("You don't have enough money to buy this buff.");
    }
  }
}

function ShowModal(text: string) {
  let box = document.getElementById("modalContent");
  let background = document.getElementById("modalBackground");

  document.getElementById("modText")!.innerText = text;

  if (box != null && background != null) {
    if (box.style.height == "0px") {
      box.style.height = "200px";
      background.style.height = "100%";
    } else {
      box.style.height = "0px";
      background.style.height = "0px";
    }
  }
}
