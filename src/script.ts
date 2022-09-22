import { AddMoney } from "./dev.js";
import { ShowModal, CloseModal } from "./visual.js";
import { GetValues, SetUnitCost } from "./values.js";

let interval = 0;
let aCInterval = 0;
let count = 0;
let level = 1;

// Event listeners
document.getElementById("tank")?.addEventListener("click", ManualClicks);
document.getElementById("btnReset")?.addEventListener("click", () => {
  Reset();
});
document.getElementById("btnStartTimer")?.addEventListener("click", () => {
  StartTimer(10);
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
document.getElementById("btnCalcAutoClicks")?.addEventListener("click", () => {
  CalcAutoClicksValue();
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

document.getElementById("btnSL6")?.addEventListener("click", () => {
  SetLevel(6);
});
document.getElementById("btnSL12")?.addEventListener("click", () => {
  SetLevel(12);
});

const realbutton = document.querySelectorAll(".realbutton");
realbutton.forEach((sec) => {
  sec.addEventListener("click", () => {
    let unit = sec.innerHTML;
    unit = unit.split(" ")[0].toLowerCase();
    PurchaseUnit(unit);
  });
});

// Used for manual clicks.  Should probably have a better name.
function ManualClicks() {
  let clicks = document.getElementById("clicks");
  let zombies = document.getElementById("zombies");
  let currency = document.getElementById("currency");

  if (interval === 0) {
    StartTimer(10);
    StartACInterval();
  }

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
      //UpdateAutoclicker(autoclicksValue);
      UpdateUnitCost(unit);

      autoClicks.innerText = autoclicksValue.toString();
    } else alert("not enough money for " + unit);
  }
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
function StartACInterval() {
  console.log("ac interval started");
  let currency = document.getElementById("currency")!;
  let zombies = document.getElementById("zombies")!;

  let zombiesValue = 0;
  let currencyValue = 0;

  let autoclicks = CalcAutoClicksValue();

  // this needs ajusting.
  clearInterval(aCInterval);
  console.log(`aCInterval - ${aCInterval}`);

  aCInterval = setInterval(() => {
    currencyValue = parseInt(currency.innerText);
    zombiesValue = parseInt(zombies.innerText);

    currencyValue += autoclicks;
    zombiesValue -= autoclicks;

    currency!.innerText = currencyValue.toString();
    zombies!.innerText = zombiesValue.toString();

    CheckWinCondition();

    console.log(`Zombies Value - ${zombiesValue}`);
  }, 1000);
}

function CalcAutoClicksValue(): number {
  let values = GetValues();

  let autoclicksValue =
    values.infantrymen * 1 +
    values.machineguns * 2 +
    values.turrets * 4 +
    values.cannons * 8 +
    values.gunships * 16 +
    values.battleships * 32 +
    values.sateliteguns * 64 +
    values.spaceships * 128; // Update with more units later.

  console.log("Current Values");
  console.log(values);
  console.log(`Autoclicks - ${autoclicksValue}`);
  return autoclicksValue;
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
  console.log("resetting normal stuff");
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
  console.log("resetting unit costs");
  SetUnitCost("infantrymen", 10);
  SetUnitCost("machineguns", 20);
  SetUnitCost("turrets", 40);
  SetUnitCost("cannons", 80);
  SetUnitCost("gunships", 160);
  SetUnitCost("battleships", 320);
  SetUnitCost("sateliteguns", 640);
  SetUnitCost("spaceships", 1280);
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
  if (time < 0) {
    clearInterval(interval);
    clearInterval(aCInterval);
    alert("You have been overrun with zombies!");
  }
}

function SetLevel(levelValue: number): void {
  const level = document.getElementById("level")!;

  if (level.innerText === levelValue.toString()) {
    alert(`Its already level ${levelValue}`);
    return;
  }

  alert(`Level set to ${levelValue}`);

  level.innerText = levelValue.toString();

  const zombies = document.getElementById("zombies")!;
  let zombiesValue = parseInt(zombies.innerText);
  let timer = document.getElementById("timer")!;
  timer.innerText = "10";

  zombiesValue = levelValue * 10;
  zombies.innerText = zombiesValue.toString();

  ResetTimer();
  clearInterval(aCInterval);
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

// Starts countdown timer, on separate interval than the autoclick interval.
function StartTimer(speed: number) {
  let timer = document.getElementById("timer")!;

  let time = parseInt(timer.innerText);
  console.log("Timer Started");

  //Upon starting of click start timer from initial going down to zero.
  interval = setInterval(() => {
    time -= 0.01;
    let t = time.toFixed(2);

    if (time % 1 === 0) console.log(t);

    timer.innerText = t.toString();
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
