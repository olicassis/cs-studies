class GPS {
  name: string = "gps";
}

class TripComputer {
  name: string = "trip_computer";
}

class Engine {
  name: string = "engine";
}

class SportsEngine extends Engine {
  name: string = "sports_engine";
}

// Product class
class Car {
  private seatsQuantity!: number;
  private gps!: GPS;
  private tripComputer!: TripComputer;
  private engine!: Engine;

  constructor() {}

  setSeats(quantity: number) {
    this.seatsQuantity = quantity;
  }

  setGPS(gps: GPS) {
    this.gps = gps;
  }

  setTripComputer(tripComputer: TripComputer) {
    this.tripComputer = tripComputer;
  }

  setEngine(engine: Engine) {
    this.engine = engine;
  }

  describe() {
    console.log(
      `A car with ${this.seatsQuantity} seats, a ${this.gps.name}, an ${this.engine.name}, and a ${this.tripComputer.name}`,
    );
  }
}

// Builder interface
interface Builder {
  reset(): void;
  setSeats(quantity: number): void;
  setEngine(engine: Engine): void;
  setTripComputer(set: boolean): void;
  setGPS(set: boolean): void;
}

// Concrete builder
class CarBuilder implements Builder {
  private car!: Car;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.car = new Car();
  }

  setSeats(quantity: number): void {
    this.car.setSeats(quantity);
  }

  setEngine(engine: Engine): void {
    this.car.setEngine(engine);
  }

  setTripComputer(set: boolean): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    set && this.car.setTripComputer(new TripComputer());
  }

  setGPS(set: boolean): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    set && this.car.setGPS(new GPS());
  }

  getProduct(): Car {
    const product = this.car;
    this.reset();
    return product;
  }
}

// Director class (optional)
class Director {
  constructSportsCar(builder: Builder) {
    builder.reset();
    builder.setSeats(2);
    builder.setEngine(new SportsEngine());
    builder.setTripComputer(true);
    builder.setGPS(true);
  }
}

// Client code
class Application {
  makeCar() {
    const director = new Director();
    const carBuilder = new CarBuilder();
    director.constructSportsCar(carBuilder);
    const car = carBuilder.getProduct();
    car.describe();
  }
}

console.log("Example:\n");
const app = new Application();
app.makeCar();
