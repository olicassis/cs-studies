// Base Prototype
abstract class Shape {
  x!: number;
  y!: number;
  color!: string;

  constructor();
  constructor(source: Shape);

  constructor(source?: Shape) {
    if (source) {
      this.x = source.x;
      this.y = source.y;
      this.color = source.color;
    }
  }

  abstract clone(): Shape;
}

// Concrete Prototype
class Rectangle extends Shape {
  width!: number;
  height!: number;

  constructor();
  constructor(source: Rectangle);

  constructor(source?: Rectangle) {
    super(source!);
    if (source) {
      this.width = source.width;
      this.height = source.height;
    }
  }

  clone(): Shape {
    return new Rectangle(this);
  }
}

class Circle extends Shape {
  radius!: number;

  constructor();
  constructor(source: Circle);

  constructor(source?: Circle) {
    super(source!);
    if (source) {
      this.radius = source.radius;
    }
  }

  clone(): Shape {
    return new Circle(this);
  }
}

// Client code
class Application {
  shapes: Shape[] = [];

  constructor() {
    const circle: Circle = new Circle();
    circle.x = 10;
    circle.y = 10;
    circle.radius = 20;
    this.shapes.push(circle);

    const anotherCircle = circle.clone();
    this.shapes.push(anotherCircle);

    const rectangle = new Rectangle();
    rectangle.width = 10;
    rectangle.height = 20;
    this.shapes.push(rectangle);
  }

  businessLogic() {
    const shapesCopy: Shape[] = [];
    this.shapes.forEach((shape) => {
      const clone = shape.clone();
      shapesCopy.push(clone);
      if (clone instanceof Circle) {
        console.log(`Circle of radius ${clone.radius}u cloned`);
      }
      if (clone instanceof Rectangle) {
        console.log(
          `Rectangle of area ${clone.height * clone.width}u\u00B2 cloned`,
        );
      }
    });
  }
}

console.log("Example:\n");
const app = new Application();
app.businessLogic();
