import { AddMoney } from "./dev.js";
import { ShowModal, CloseModal } from "./visual.js";

let interval = 0;
let count = 0;
let level = 1;

// Event listeners
document.getElementById("tank")?.addEventListener("click", ManualClicks);
document.getElementById("btnReset")?.addEventListener("click", () => {
  Reset();
});
document.getElementById("btnStartTimer")?.addEventListener("click", () => {
  StartTimer(1000);
});
document.getElementById("btnStopTimer")?.addEventListener("click", () => {
  StopTimer();
});
document.getElementById("btnResetTimer")?.addEventListener("click", () => {
  ResetTimer();
});

document.getElementById("btnAddMoney160")?.addEventListener("click", () => {
  AddMoney(160);
});
document.getElementById("btnAddMoney320")?.addEventListener("click", () => {
  AddMoney(320);
});
document.getElementById("btnAddMoney640")?.addEventListener("click", () => {
  AddMoney(640);
});
document.getElementById("btnAddMoney1280")?.addEventListener("click", () => {
  AddMoney(1280);
});
document.getElementById("btnModal")?.addEventListener("click", () => {
  ShowModal("test", "this is test content");
});
document.getElementById("btnModalYes")?.addEventListener("click", () => {
  CloseModal();
});
document.getElementById("btnModalNo")?.addEventListener("click", () => {
  CloseModal();
});

document.getElementById("btnPurchaseUnit1")?.addEventListener("click", () => {
  PurchaseUnit("infantrymen");
});
document.getElementById("btnPurchaseUnit2")?.addEventListener("click", () => {
  PurchaseUnit("machineguns");
});
document.getElementById("btnPurchaseUnit3")?.addEventListener("click", () => {
  PurchaseUnit("turrets");
});
document.getElementById("btnPurchaseUnit4")?.addEventListener("click", () => {
  PurchaseUnit("cannons");
});
document.getElementById("btnPurchaseUnit5")?.addEventListener("click", () => {
  PurchaseUnit("gunships");
});
document.getElementById("btnPurchaseUnit6")?.addEventListener("click", () => {
  PurchaseUnit("battleships");
});
document.getElementById("btnPurchaseUnit7")?.addEventListener("click", () => {
  PurchaseUnit("sateliteguns");
});
document.getElementById("btnPurchaseUnit8")?.addEventListener("click", () => {
  PurchaseUnit("spaceships");
});

document.querySelector(".realbutton")?.addEventListener("click", (event) => {
  console.log(`event button - ${event}`);
});

// Used for manual clicks.  Should probably have a better name.
function ManualClicks() {
  let clicks = document.getElementById("clicks");
  let zombies = document.getElementById("zombies");
  let currency = document.getElementById("currency");

  if (interval === 0) StartTimer(1000);

  if (clicks != null && zombies != null && currency != null) {
    let clicksValue = parseInt(clicks.innerText);
    let zombiesValue = parseInt(zombies.innerText);
    let currencyValue = parseInt(currency.innerText);

    zombiesValue--;
    clicksValue++;
    currencyValue++;

    clicks.innerText = clicksValue.toString();
    zombies.innerText = zombiesValue.toString();
    currency.innerText = currencyValue.toString();

    CheckWinCondition();
  }
}

// Updates count of new unit
function PurchaseUnit(unit: string) {
  let currency = document.getElementById("currency");
  let amountOfUnits = document.getElementById(unit)!;
  let autoClicks = document.getElementById("autoClicks");

  if (currency != null && amountOfUnits != null && autoClicks != null) {
    let currencyValue = parseInt(currency.innerText);
    let amountOfUnitsValue = parseInt(amountOfUnits.innerText);
    let unitCost = 0;

    // Determines unit cost.
    console.log(unit);
    unitCost = parseInt(document.getElementsByClassName(unit + "Cost")[0].innerHTML);

    // Checks to see if you have enough currency to purchase unit.  If so, subtracts costs then updates new unit price.
    if (currencyValue >= unitCost) {
      amountOfUnitsValue++;
      currencyValue -= unitCost;

      amountOfUnits.innerText = amountOfUnitsValue.toString();
      currency.innerText = currencyValue.toString();

      let values = GetValues();

      // Sets multiple intervals.  Needs to be refactored.
      // Instead of having separte interval for each unit.  Need to combine the autoclicks and set interval based off that.
      // get how many of each unit we have*their point value.  Add them up then set one interval based off that.

      let autoclicksValue =
        values.infantrymen * 1 +
        values.machineguns * 2 +
        values.turrets * 4 +
        values.cannons * 8 +
        values.gunships * 16 +
        values.battleships * 32 +
        values.sateliteguns * 64 +
        values.spaceships * 128; // Update with more units later.

      console.clear();
      console.log(`Unit cost - ${unitCost}`);
      console.log(`autoclicks - ${autoclicksValue}`);

      ConsoleOutputValues(values);
      UpdateAutoclicker(autoclicksValue);
      UpdateUnitCost(unit);

      autoClicks.innerText = autoclicksValue.toString();
    } else alert("not enough money for " + unit);
  }
}

// Gets values of all the infantry.
// Returns an object with all the values.
function GetValues() {
  const values = { infantrymen: 0, machineguns: 0, turrets: 0, cannons: 0, gunships: 0, battleships: 0, sateliteguns: 0, spaceships: 0 };

  values.infantrymen = parseInt(document.getElementById("infantrymen")!.innerText);
  values.machineguns = parseInt(document.getElementById("machineguns")!.innerText);
  values.turrets = parseInt(document.getElementById("turrets")!.innerText);
  values.cannons = parseInt(document.getElementById("cannons")!.innerText);
  values.gunships = parseInt(document.getElementById("gunships")!.innerText);
  values.battleships = parseInt(document.getElementById("battleships")!.innerText);
  values.sateliteguns = parseInt(document.getElementById("sateliteguns")!.innerText);
  values.spaceships = parseInt(document.getElementById("spaceships")!.innerText);

  return values;
}

// Outputs values to the console.
// TBD

function ConsoleOutputValues(values: any): void {
  //console.clear();
  //console.log(`Unit cost - ${unitCost}`);
  //console.log(`autoclicks - ${autoclicksValue}`);
  console.log(`Infantrymen - ${values.infantrymen}`);
  console.log(`machineguns - ${values.machineguns}`);
  console.log(`turrets - ${values.turrets}`);
  console.log(`cannons - ${values.cannons}`);
  console.log(`gunships - ${values.gunships}`);
  console.log(`battleships - ${values.battleships}`);
  console.log(`sateliteguns - ${values.sateliteguns}`);
  console.log(`spaceships - ${values.spaceships}`);
}

// Order this needs to happen.  take cost from button.  Subtract from currency.  then calculate new cost and append button.
function UpdateUnitCost(unit: string): void {
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

// Need to adjust this to make the autoclicker minus from zombies.
function UpdateAutoclicker(autoclicks: number) {
  let currency = document.getElementById("currency");
  let zombies = document.getElementById("zombies")!;
  let zombiesValue = parseInt(zombies.innerText);

  let currencyValue = 0;

  // this needs ajusting.
  if (currency != null) {
    clearInterval(interval);

    interval = setInterval(() => {
      currencyValue = parseInt(currency!.innerText);
      currencyValue += autoclicks;
      zombiesValue -= autoclicks;
      currency!.innerText = currencyValue.toString();
      zombies!.innerText = zombiesValue.toString();
      CheckWinCondition();
      console.log(`Zombies Value - ${zombiesValue}`);
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

// Used in a button to reset all fields to starting points again.
function Reset(): void {
  clearInterval(interval);
  count = 0;
  level = 1;

  document.getElementById("level")!.innerText = level.toString();
  document.getElementById("zombies")!.innerText = "10";
  document.getElementById("currency")!.innerText = "0";
  document.getElementById("timer")!.innerText = "10";

  document.getElementById("clicks")!.innerText = "0";
  document.getElementById("autoClicks")!.innerText = "0";

  document.getElementById("infantrymen")!.innerText = "0";
  document.getElementById("machineguns")!.innerText = "0";
  document.getElementById("turrets")!.innerText = "0";
  document.getElementById("cannons")!.innerText = "0";
  document.getElementById("gunships")!.innerText = "0";
  document.getElementById("battleships")!.innerText = "0";
  document.getElementById("sateliteguns")!.innerText = "0";
  document.getElementById("spaceships")!.innerText = "0";
  // Reset also needs to set the value of unit price to level 1 levels
}

// Used to check if zombies are at 0
function CheckWinCondition(): void {
  let zombies = document.getElementById("zombies")!;
  let zombiesValue = parseInt(zombies.innerText);

  if (zombiesValue <= 0) {
    alert(`Congrats! You beat level ${level}`);
    level++;
    SetLevel(level);

    // Raise amount of zombies here.  Later to be done by a function.
  }
}

function CheckLoseCondition(time: number): void {
  if (time === 0) {
    clearInterval(interval);
    alert("You lost!");
  }
}

function SetLevel(levelValue: number): void {
  alert(`level set to ${levelValue}`);

  let level = document.getElementById("level")!;
  level.innerText = levelValue.toString();

  let zombies = document.getElementById("zombies")!;
  let zombiesValue = parseInt(zombies.innerText);
  let timer = document.getElementById("timer")!;
  timer.innerText = "10";

  zombiesValue = levelValue * 10;
  zombies.innerText = zombiesValue.toString();
  ResetTimer();
}

// Start timer with arguments from parameters.
function StartTimerWArgs(initial: number, speed: number) {
  let time = initial;
  console.log("Timer Started");

  //Upon starting of click start timer from initial going down to zero.
  interval = setInterval(() => {
    time -= 1;
    console.log(time);
    document.getElementById("timer")!.innerText = time.toString();
    CheckLoseCondition(time);
  }, speed);
}

function StartTimer(speed: number) {
  let timer = document.getElementById("timer")!;

  let time = parseInt(timer.innerText);
  console.log("Timer Started");

  //Upon starting of click start timer from initial going down to zero.
  interval = setInterval(() => {
    time -= 1;
    console.log(time);
    timer.innerText = time.toString();
    CheckLoseCondition(time);
  }, speed);
}

function StopTimer(): void {
  clearInterval(interval);

  console.log("Timer Stopped!");
}

function ResetTimer(): void {
  clearInterval(interval);
  console.log(`interval is - ${interval}`);
  interval = 0;

  document.getElementById("timer")!.innerText = (10).toString();
  console.log("Timer Reset!");
}
