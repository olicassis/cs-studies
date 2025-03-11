// Product Interface
interface Button {
  render(): void;
  onClick(f: string): void;
}

// Creator
abstract class Dialog {
  abstract createButton(): Button;
  render(): void {
    const okButton: Button = this.createButton();
    okButton.onClick("Close Dialog");
    okButton.render();
  }
}

// Concrete implementations of Product Interface
class WindowsButton implements Button {
  render(): void {
    console.log("Windows button rendered.");
  }
  onClick(f: string): void {
    console.log(`Windows button clicked: ${f}`);
  }
}

class HTMLButton implements Button {
  render(): void {
    console.log("HTML button rendered.");
  }
  onClick(f: string): void {
    console.log(`HTML button clicked: ${f}`);
  }
}

// Concrete implementations of Creator
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton();
  }
}

function readApplicationConfigFile() {
  const platforms = ["Windows", "Web"];
  return { OS: platforms[Math.floor(Math.random() * platforms.length)] };
}

// Usage in an application
class Application {
  dialog: Dialog;

  constructor() {
    const config = readApplicationConfigFile();

    if (config.OS === "Windows") {
      this.dialog = new WindowsDialog();
    } else if (config.OS === "Web") {
      this.dialog = new WebDialog();
    } else {
      throw new Error("Unknown operating system.");
    }
  }
}

console.log("Example:\n");
const app = new Application();
app.dialog.render();
