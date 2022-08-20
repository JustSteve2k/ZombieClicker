var interval = 0;
var count = 0;
// Event listeners
document.getElementById("tank").addEventListener("click", UpdateCountV2);
// Placeholder function.
function NotReady() {
    alert("This function is not implemented yet.");
}
// Used for manual clicks.  Should probably have a better name.
function UpdateCount() {
    var clicks = parseInt(document.getElementById("clicks").innerText);
    clicks++;
    var currency = parseInt(document.getElementById("currency").innerText);
    currency++;
    document.getElementById("currency").innerHTML = currency.toString();
    document.getElementById("clicks").innerHTML = clicks.toString();
}
// Used for manual clicks.  Should probably have a better name.
function UpdateCountV2() {
    var clicks = parseInt(document.getElementById("clicks").innerText);
    var zombies = parseInt(document.getElementById("zombies").innerText);
    zombies--;
    clicks++;
    document.getElementById("clicks").innerText = clicks.toString();
    document.getElementById("zombies").innerText = zombies.toString();
}
// Used for adding money buttons.  Mostly for testing.
function AddMoney(amount) {
    var currency = parseInt(document.getElementById("currency").innerText);
    currency += amount;
    document.getElementById("currency").innerText = currency.toString();
}
// Updates count of new unit
function PurchaseUnit(unit) {
    var currency = parseInt(document.getElementById("currency").innerText);
    var amountOfUnits = parseInt(document.getElementById(unit).innerText);
    var unitCost = 0;
    // Determines unit cost.
    unitCost = parseInt(document.getElementsByClassName(unit + "Cost")[0].innerHTML);
    // Checks to see if you have enough currency to purchase unit.  If so, subtracts costs then updates new unit price.
    if (currency >= unitCost) {
        amountOfUnits++;
        currency -= unitCost;
        document.getElementById(unit).innerText = amountOfUnits.toString();
        document.getElementById("currency").innerText = currency.toString();
        // Sets multiple intervals.  Needs to be refactored.
        // Instead of having separte interval for each unit.  Need to combine the autoclicks and set interval based off that.
        // get how many of each unit we have*their point value.  Add them up then set one interval based off that.
        var infantrymen = parseInt(document.getElementById("infantrymen").innerText);
        var machineguns = parseInt(document.getElementById("machineguns").innerText);
        var turrets = parseInt(document.getElementById("turrets").innerText);
        var cannons = parseInt(document.getElementById("cannons").innerText);
        var gunships = parseInt(document.getElementById("gunships").innerText);
        var battleships = parseInt(document.getElementById("battleships").innerText);
        var sateliteguns = parseInt(document.getElementById("sateliteguns").innerText);
        var spaceships = parseInt(document.getElementById("spaceships").innerText);
        var autoclicks = infantrymen * 1 + machineguns * 2 + turrets * 4 + cannons * 8 + gunships * 16 + battleships * 32 + sateliteguns * 64 + spaceships * 128; // Update with more units later.
        console.clear();
        console.log("Unit cost - ".concat(unitCost));
        console.log("autoclicks - ".concat(autoclicks));
        console.log("Infantrymen - ".concat(infantrymen));
        console.log("machineguns - ".concat(machineguns));
        console.log("turrets - ".concat(turrets));
        console.log("cannons - ".concat(cannons));
        console.log("gunships - ".concat(gunships));
        console.log("battleships - ".concat(battleships));
        console.log("sateliteguns - ".concat(sateliteguns));
        console.log("spaceships - ".concat(spaceships));
        UpdateAutoclicker(autoclicks);
        UpdateUnitCost(unit);
        document.getElementById("autoClicks").innerText = autoclicks.toString();
    }
    else
        alert("not enough money for " + unit);
}
// Order this needs to happen.  take cost from button.  Subtract from currency.  then calculate new cost and append button.
function UpdateUnitCost(unit) {
    var unitCost = 0;
    var amountOfUnits = parseInt(document.getElementById(unit).innerText);
    var difficultyModifier = 1.2; // Formula to determine scaling needs to be reworked
    switch (unit) {
        case "infantrymen":
            unitCost = 10 + Math.pow(1 + amountOfUnits, difficultyModifier);
            break;
        case "machineguns":
            unitCost = 20 + Math.pow(2 + amountOfUnits, difficultyModifier);
            break;
        case "turrets":
            unitCost = 40 + Math.pow(4 + amountOfUnits, difficultyModifier);
            break;
        case "cannons":
            unitCost = 80 + Math.pow(8 + amountOfUnits, difficultyModifier);
            break;
        case "gunships":
            unitCost = 160 + Math.pow(16 + amountOfUnits, difficultyModifier);
            break;
        case "battleships":
            unitCost = 320 + Math.pow(32 + amountOfUnits, difficultyModifier);
            break;
        case "sateliteguns":
            unitCost = 640 + Math.pow(64 + amountOfUnits, difficultyModifier);
            break;
        case "spaceships":
            unitCost = 1280 + Math.pow(128 + amountOfUnits, difficultyModifier);
            break;
    }
    unitCost = Math.floor(unitCost);
    document.getElementsByClassName(unit + "Cost")[0].innerHTML = unitCost.toString();
}
function UpdateAutoclicker(autoclicks) {
    var currency = 0;
    clearInterval(interval);
    interval = setInterval(function () {
        currency = parseInt(document.getElementById("currency").innerText);
        currency += autoclicks;
        document.getElementById("currency").innerText = currency.toString();
    }, 1000);
}
function BuyBuff(elem, cost) {
    var currency = parseInt(document.getElementById("currency").innerText);
    // Check if enough currency.
    if (currency >= cost) {
        elem.style.backgroundColor = "red";
        elem.style.border = "1px solid white";
        return;
    }
    else {
        alert("You don't have enough money to buy this buff.");
    }
}
function ShowModal(text) {
    var box = document.getElementById("modalContent");
    var background = document.getElementById("modalBackground");
    document.getElementById("modText").innerText = text;
    if (box.style.height == "0px") {
        box.style.height = "200px";
        background.style.height = "100%";
    }
    else {
        box.style.height = "0px";
        background.style.height = "0px";
    }
}
