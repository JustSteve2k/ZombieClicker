export class Tower {
  public health: number;
  public id: number;
  private defence: number = 0;

  // Future things to add: innate attack.  Maintenance cost?

  constructor(health: number, id: number) {
    this.health = health;
    this.id = id;
  }

  lowerHealth(amount: number): void {
    this.health -= amount;
  }

  raiseHealth(amount: number): void {
    this.health -= amount;
  }

  outputInfo() {
    console.log(`${this.id} - Tower ID`);
    console.log(`${this.health} - Tower Health`);
  }

  static testButton() {
    console.log("works!");
  }
}
