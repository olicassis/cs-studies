// Example 1: before refactoring

class Car1 {
  private make: string;
  private model: string;
  private year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public getCarInfo(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }

  public setCarInfo(make: string, model: string, year: number): void {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public drive(): void {
    console.log(`${this.make}, ${this.model} is driving itself.`);
  }
}

const car1 = new Car1("Toyota", "Camry", 2020);
console.log("Example 1:\n");
car1.drive();

// Example 2: after refactoring

class Car2 {
  private make: string;
  private model: string;
  private year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public getCarInfo(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }

  public setCarInfo(make: string, model: string, year: number): void {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

class Driver {
  private name: string;
  private car: Car2;

  constructor(name: string, car: Car2) {
    this.name = name;
    this.car = car;
  }

  public drive(): void {
    console.log(`${this.name} is driving the ${this.car.getCarInfo()}.`);
  }
}

const car2 = new Car2("Toyota", "Camry", 2020);
const driver = new Driver("John", car2);
console.log("\nExample 2:\n");
driver.drive();
