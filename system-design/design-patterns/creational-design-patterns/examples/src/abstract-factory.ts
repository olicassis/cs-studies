// Abstract Factory
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete Factories
class WinFactory implements GUIFactory {
  createButton() {
    return new WinButton();
  }
  createCheckbox() {
    return new WinCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckbox();
  }
}

// Product Interfaces
interface Button {
  paint(): void;
}

interface Checkbox {
  paint(): void;
}

// Concrete Products
class WinButton implements Button {
  paint(): void {
    console.log("Windows Button rendered!");
  }
}

class MacButton implements Button {
  paint(): void {
    console.log("Mac Button rendered!");
  }
}

class WinCheckbox implements Checkbox {
  paint(): void {
    console.log("Windows Checkbox rendered!");
  }
}

class MacCheckbox implements Checkbox {
  paint(): void {
    console.log("Mac Checkbox rendered!");
  }
}

// Client code working with abstract types
class Application {
  private factory: GUIFactory;
  private button!: Button;

  constructor(factory: GUIFactory) {
    this.factory = factory;
  }

  createUI() {
    this.button = this.factory.createButton();
  }

  paint() {
    this.button.paint();
  }
}

function readApplicationConfigFile() {
  const platforms = ["Windows", "Mac"];
  return { OS: platforms[Math.floor(Math.random() * platforms.length)] };
}

// Usage in application
class ApplicationConfigurator {
  main() {
    const config = readApplicationConfigFile();
    let factory = null;

    if (config.OS === "Windows") {
      factory = new WinFactory();
    } else if (config.OS === "Mac") {
      factory = new MacFactory();
    } else {
      throw new Error("Error! Unknown operating system.");
    }

    const app: Application = new Application(factory);
    app.createUI();
    app.paint();
  }
}

console.log("Example:\n");
const app = new ApplicationConfigurator();
app.main();
