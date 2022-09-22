// Gets values of all the infantry.
// Returns an object with all the values.
export function GetValues() {
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

export function SetUnitCost(unit: string, cost: number) {
  const fullName = unit + "Cost";
  const field = document.querySelector("." + fullName) as HTMLElement | null;

  if (field != null) field.innerText = cost.toString();
}

// Gets game stats.
export function getStats() {
  const values = { level: 0, zombies: 0, currency: 0 };

  values.level = parseInt(document.getElementById("level")!.innerText);
  values.zombies = parseInt(document.getElementById("zombies")!.innerText);
  values.zombies = parseInt(document.getElementById("currency")!.innerText);

  return values;
}
