var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
import { AddMoney } from "./dev.js";
import { ShowModal, CloseModal } from "./visual.js";
let interval = 0;
let count = 0;
let level = 1;
// Event listeners
(_a = document.getElementById("tank")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", ManualClicks);
(_b = document.getElementById("btnReset")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    Reset();
});
(_c = document.getElementById("btnStartTimer")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    StartTimer(1000);
});
(_d = document.getElementById("btnStopTimer")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    StopTimer();
});
(_e = document.getElementById("btnResetTimer")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    ResetTimer();
});
(_f = document.getElementById("btnAddMoney160")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    AddMoney(160);
});
(_g = document.getElementById("btnAddMoney320")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    AddMoney(320);
});
(_h = document.getElementById("btnAddMoney640")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
    AddMoney(640);
});
(_j = document.getElementById("btnAddMoney1280")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => {
    AddMoney(1280);
});
(_k = document.getElementById("btnModal")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", () => {
    ShowModal("test", "this is test content");
});
(_l = document.getElementById("btnModalYes")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", () => {
    CloseModal();
});
(_m = document.getElementById("btnModalNo")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => {
    CloseModal();
});
(_o = document.getElementById("btnPurchaseUnit1")) === null || _o === void 0 ? void 0 : _o.addEventListener("click", () => {
    PurchaseUnit("infantrymen");
});
(_p = document.getElementById("btnPurchaseUnit2")) === null || _p === void 0 ? void 0 : _p.addEventListener("click", () => {
    PurchaseUnit("machineguns");
});
(_q = document.getElementById("btnPurchaseUnit3")) === null || _q === void 0 ? void 0 : _q.addEventListener("click", () => {
    PurchaseUnit("turrets");
});
(_r = document.getElementById("btnPurchaseUnit4")) === null || _r === void 0 ? void 0 : _r.addEventListener("click", () => {
    PurchaseUnit("cannons");
});
(_s = document.getElementById("btnPurchaseUnit5")) === null || _s === void 0 ? void 0 : _s.addEventListener("click", () => {
    PurchaseUnit("gunships");
});
(_t = document.getElementById("btnPurchaseUnit6")) === null || _t === void 0 ? void 0 : _t.addEventListener("click", () => {
    PurchaseUnit("battleships");
});
(_u = document.getElementById("btnPurchaseUnit7")) === null || _u === void 0 ? void 0 : _u.addEventListener("click", () => {
    PurchaseUnit("sateliteguns");
});
(_v = document.getElementById("btnPurchaseUnit8")) === null || _v === void 0 ? void 0 : _v.addEventListener("click", () => {
    PurchaseUnit("spaceships");
});
(_w = document.querySelector(".realbutton")) === null || _w === void 0 ? void 0 : _w.addEventListener("click", (event) => {
    console.log(`event button - ${event}`);
});
// Used for manual clicks.  Should probably have a better name.
function ManualClicks() {
    let clicks = document.getElementById("clicks");
    let zombies = document.getElementById("zombies");
    let currency = document.getElementById("currency");
    if (interval === 0)
        StartTimer(1000);
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
            UpdateAutoclicker(autoclicksValue);
            UpdateUnitCost(unit);
            autoClicks.innerText = autoclicksValue.toString();
        }
        else
            alert("not enough money for " + unit);
    }
}
// Gets values of all the infantry.
// Returns an object with all the values.
function GetValues() {
    const values = { infantrymen: 0, machineguns: 0, turrets: 0, cannons: 0, gunships: 0, battleships: 0, sateliteguns: 0, spaceships: 0 };
    values.infantrymen = parseInt(document.getElementById("infantrymen").innerText);
    values.machineguns = parseInt(document.getElementById("machineguns").innerText);
    values.turrets = parseInt(document.getElementById("turrets").innerText);
    values.cannons = parseInt(document.getElementById("cannons").innerText);
    values.gunships = parseInt(document.getElementById("gunships").innerText);
    values.battleships = parseInt(document.getElementById("battleships").innerText);
    values.sateliteguns = parseInt(document.getElementById("sateliteguns").innerText);
    values.spaceships = parseInt(document.getElementById("spaceships").innerText);
    return values;
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
function UpdateAutoclicker(autoclicks) {
    let currency = document.getElementById("currency");
    let zombies = document.getElementById("zombies");
    let zombiesValue = parseInt(zombies.innerText);
    let currencyValue = 0;
    // this needs ajusting.
    if (currency != null) {
        clearInterval(interval);
        interval = setInterval(() => {
            currencyValue = parseInt(currency.innerText);
            currencyValue += autoclicks;
            zombiesValue -= autoclicks;
            currency.innerText = currencyValue.toString();
            zombies.innerText = zombiesValue.toString();
            CheckWinCondition();
            console.log(`Zombies Value - ${zombiesValue}`);
        }, 1000);
    }
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
    clearInterval(interval);
    count = 0;
    level = 1;
    document.getElementById("level").innerText = level.toString();
    document.getElementById("zombies").innerText = "10";
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
    // Reset also needs to set the value of unit price to level 1 levels
}
// Used to check if zombies are at 0
function CheckWinCondition() {
    let zombies = document.getElementById("zombies");
    let zombiesValue = parseInt(zombies.innerText);
    if (zombiesValue <= 0) {
        alert(`Congrats! You beat level ${level}`);
        level++;
        SetLevel(level);
        // Raise amount of zombies here.  Later to be done by a function.
    }
}
function CheckLoseCondition(time) {
    if (time === 0) {
        clearInterval(interval);
        alert("You lost!");
    }
}
function SetLevel(levelValue) {
    alert(`level set to ${levelValue}`);
    let level = document.getElementById("level");
    level.innerText = levelValue.toString();
    let zombies = document.getElementById("zombies");
    let zombiesValue = parseInt(zombies.innerText);
    let timer = document.getElementById("timer");
    timer.innerText = "10";
    zombiesValue = levelValue * 10;
    zombies.innerText = zombiesValue.toString();
    ResetTimer();
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
function StartTimer(speed) {
    let timer = document.getElementById("timer");
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
