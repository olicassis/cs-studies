// Example 1: before refactoring

class MusicalInstrument1 {
  private name: string;
  private type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  public play(): void {
    if (this.type === "chords") {
      console.log(
        `${this.name} is played by strumming or plucking its strings.`,
      );
    } else if (this.type === "keyboards") {
      console.log(`${this.name} is played by pressing its keys.`);
    } else if (this.type === "breaths") {
      console.log(`${this.name} is played by blowing air into it.`);
    } else if (this.type === "percussion") {
      console.log(
        `${this.name} is played by striking it with hands or drumsticks.`,
      );
    } else if (this.type === "bowed strings") {
      console.log(
        `${this.name} is played by drawing a bow across its strings.`,
      );
    } else {
      throw new Error(`Unknown instrument type: ${this.type}`);
    }
  }
}

const guitar1 = new MusicalInstrument1("Guitar", "chords");
const piano1 = new MusicalInstrument1("Piano", "keyboards");
const flute1 = new MusicalInstrument1("Flute", "breaths");
const drum1 = new MusicalInstrument1("Drum", "percussion");
const violin1 = new MusicalInstrument1("Violin", "bowed strings");

console.log("Example 1:\n");
guitar1.play();
piano1.play();
flute1.play();
drum1.play();
violin1.play();

// Example 2: after refactoring
interface PlayableInstrument {
  name: string;
  play(): void;
}

abstract class MusicalInstrument2 implements PlayableInstrument {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract play(): void;
}

class ChordInstrument extends MusicalInstrument2 {
  public play(): void {
    console.log(`${this.name} is played by strumming or plucking its strings.`);
  }
}

class KeyboardInstrument extends MusicalInstrument2 {
  public play(): void {
    console.log(`${this.name} is played by pressing its keys.`);
  }
}

class WindInstrument extends MusicalInstrument2 {
  public play(): void {
    console.log(`${this.name} is played by blowing air into it.`);
  }
}

class PercussionInstrument extends MusicalInstrument2 {
  public play(): void {
    console.log(
      `${this.name} is played by striking it with hands or drumsticks.`,
    );
  }
}

class BowedStringInstrument extends MusicalInstrument2 {
  public play(): void {
    console.log(`${this.name} is played by drawing a bow across its strings.`);
  }
}

const guitar2 = new ChordInstrument("Guitar");
const piano2 = new KeyboardInstrument("Piano");
const flute2 = new WindInstrument("Flute");
const drum2 = new PercussionInstrument("Drum");
const violin2 = new BowedStringInstrument("Violin");

console.log("\nExample 2:\n");
guitar2.play();
piano2.play();
flute2.play();
drum2.play();
violin2.play();
