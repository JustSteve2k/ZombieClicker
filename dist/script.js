import { AddMoney } from "./dev.js";
import { ShowModal, CloseModal } from "./visual.js";
import { GetValues, SetUnitCost } from "./values.js";
import { Tower } from "./tower.js";
let interval = 0; // Timer Interval.  Should probably be named better.
let aCInterval = 0; // Autoclicker Interval
let level = 1;
Startup();
function Startup() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Event listeners
    (_a = document.getElementById("tank")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", ManualClicks);
    (_b = document.getElementById("btnReset")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        Reset();
    });
    (_c = document.getElementById("btnStartTimer")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        StartTimer(10);
    });
    (_d = document.getElementById("btnStopTimer")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
        StopTimer();
    });
    (_e = document.getElementById("btnResetTimer")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
        ResetTimer();
    });
    const moneyButton = document.querySelectorAll(".moneyButton");
    moneyButton.forEach((sec) => {
        sec.addEventListener("click", () => {
            let inside = parseInt(sec.innerHTML.substring(2));
            AddMoney(inside);
        });
    });
    (_f = document
        .getElementById("btnCalcAutoClicks")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
        CalcAutoClicksValue();
    });
    (_g = document
        .getElementById("btnTowerClassTestButton")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
        Tower.testButton();
    });
    (_h = document.getElementById("btnModalYes")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
        CloseModal();
    });
    (_j = document.getElementById("btnModal")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => {
        ShowModal("TEST MODAL", "This is used to teset the modal.");
    });
    const levelButton = document.querySelectorAll(".levelButton");
    levelButton.forEach((sec) => {
        sec.addEventListener("click", () => {
            let inside = parseInt(sec.innerHTML.substring(3));
            SetLevel(inside);
        });
    });
    const realbutton = document.querySelectorAll(".realbutton");
    realbutton.forEach((sec) => {
        sec.addEventListener("click", () => {
            let unit = sec.innerHTML;
            unit = unit.split("<br>")[0].toLowerCase();
            PurchaseUnit(unit);
        });
    });
    (_k = document.getElementById("btnSaveProgress")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", () => {
        alert("Save Not Done yet!");
    });
}
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
function PurchaseUnit(unit) {
    let currency = document.getElementById("currency");
    let amountOfUnits = document.getElementById(unit);
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
            ShowModal(`${unit} Purchased!`, "Unit loaded!");
            amountOfUnitsValue++;
            currencyValue -= unitCost;
            amountOfUnits.innerText = amountOfUnitsValue.toString();
            currency.innerText = currencyValue.toString();
            let values = GetValues();
            // Sets multiple intervals.  Needs to be refactored.
            // Instead of having separte interval for each unit.  Need to combine the autoclicks and set interval based off that.
            // get how many of each unit we have*their point value.  Add them up then set one interval based off that.
            let autoclicksValue = values.infantrymen * 1 +
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
        }
        else
            alert("not enough money for " + unit);
    }
}
// Outputs values to the console.
// TBD
function ConsoleOutputValues(values) {
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
function UpdateUnitCost(unit) {
    var unitCost = 0;
    let amountOfUnits = document.getElementById(unit);
    if (amountOfUnits != null) {
        let amountOfUnitsValue = parseInt(amountOfUnits.innerText);
        let difficultyModifier = 1.4; // Formula to determine scaling needs to be reworked
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
                unitCost =
                    1280 + Math.pow(128 + amountOfUnitsValue, difficultyModifier);
                break;
        }
        unitCost = Math.floor(unitCost);
        document.getElementsByClassName(unit + "Cost")[0].innerHTML =
            unitCost.toString();
    }
}
// Need to adjust this to make the autoclicker minus from zombies.
function StartACInterval() {
    console.log("ac interval started");
    let currency = document.getElementById("currency");
    let zombies = document.getElementById("zombies");
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
        currency.innerText = currencyValue.toString();
        zombies.innerText = zombiesValue.toString();
        CheckWinCondition();
        console.log(`Zombies Value - ${zombiesValue}`);
    }, 1000);
}
function CalcAutoClicksValue() {
    let values = GetValues();
    let autoclicksValue = values.infantrymen * 1 +
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
function BuyBuff(elem, cost) {
    let currency = document.getElementById("currency");
    let currencyValue = 0;
    if (currency != null) {
        currencyValue = parseInt(currency.innerText);
        // Check if enough currency.
        if (currencyValue >= cost) {
            elem.style.backgroundColor = "red";
            elem.style.border = "1px solid white";
            return;
        }
        else {
            alert("You don't have enough money to buy this buff.");
        }
    }
}
// Used in a button to reset all fields to starting points again.
function Reset() {
    console.log("resetting normal stuff");
    clearInterval(interval);
    // level = 1;
    SetLevel(1, true);
    document.getElementById("level").innerText = level.toString();
    document.getElementById("currency").innerText = "0";
    document.getElementById("timer").innerText = "10";
    document.getElementById("clicks").innerText = "0";
    document.getElementById("autoClicks").innerText = "0";
    document.getElementById("infantrymen").innerText = "0";
    document.getElementById("machineguns").innerText = "0";
    document.getElementById("turrets").innerText = "0";
    document.getElementById("cannons").innerText = "0";
    document.getElementById("gunships").innerText = "0";
    document.getElementById("battleships").innerText = "0";
    document.getElementById("sateliteguns").innerText = "0";
    document.getElementById("spaceships").innerText = "0";
    document.getElementById("zombies").innerText = "20";
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
function CheckWinCondition() {
    let zombies = document.getElementById("zombies");
    let zombiesValue = parseInt(zombies.innerText);
    if (zombiesValue <= 0) {
        ShowModal("You win!", `Congrats for beating level ${level}`);
        // alert(`Congrats! You beat level ${level}`);
        level++;
        SetLevel(level);
        // Raise amount of zombies here.  Later to be done by a function.
    }
}
function CheckLoseCondition(time) {
    if (time < 0) {
        clearInterval(interval);
        clearInterval(aCInterval);
        ShowModal("YOU LOSE", "You have been overrun with zombies.  Please try again.");
    }
}
function SetLevel(levelValue, force) {
    const level = document.getElementById("level");
    if (level.innerText === levelValue.toString() && !force) {
        alert(`Its already level ${levelValue}`);
        return;
    }
    level.innerText = levelValue.toString();
    const zombies = document.getElementById("zombies");
    let zombiesValue = parseInt(zombies.innerText);
    let timer = document.getElementById("timer");
    timer.innerText = "10";
    zombiesValue = levelValue * 20;
    zombies.innerText = zombiesValue.toString();
    ResetTimer();
    clearInterval(aCInterval);
}
// Start timer with arguments from parameters.
function StartTimerWArgs(initial, speed) {
    let time = initial;
    console.log("Timer Started");
    //Upon starting of click start timer from initial going down to zero.
    interval = setInterval(() => {
        time -= 1;
        console.log(time);
        document.getElementById("timer").innerText = time.toString();
        CheckLoseCondition(time);
    }, speed);
}
// Starts countdown timer, on separate interval than the autoclick interval.
function StartTimer(speed) {
    let timer = document.getElementById("timer");
    let time = parseInt(timer.innerText);
    console.log("Timer Started");
    //Upon starting of click start timer from initial going down to zero.
    interval = setInterval(() => {
        time -= 0.01;
        let t = time.toFixed(2);
        if (time % 1 === 0)
            console.log(t);
        timer.innerText = t.toString();
        CheckLoseCondition(time);
    }, speed);
}
function StopTimer() {
    clearInterval(interval);
    console.log("Timer Stopped!");
}
function ResetTimer() {
    clearInterval(interval);
    console.log(`interval is - ${interval}`);
    interval = 0;
    document.getElementById("timer").innerText = (10).toString();
    console.log("Timer Reset!");
}
