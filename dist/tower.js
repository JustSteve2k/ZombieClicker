export class Tower {
    // Future things to add: innate attack.  Maintenance cost?
    constructor(health, id) {
        this.defence = 0;
        this.health = health;
        this.id = id;
    }
    lowerHealth(amount) {
        this.health -= amount;
    }
    raiseHealth(amount) {
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
