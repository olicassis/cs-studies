# SOLID

> **📝 Note:**  
> To execute a compiled TypeScript file, run the following command:  
>  
> ```sh
> npm run execute --filename=<filename>
> ```
>  
> Replace `<filename>` with the actual file name (without the `.js` extension).  
>  
> **Example:**  
> ```sh
> npm run execute --filename=srp
> ```

**SOLID** is a set of non-dogmatic principles that aims to add more flexibility, maintainability, and understandability to the process of software development. 

## S: Single Responsibility Principle

The Single Responsibility Principle (SRP) states that **a class should have only one cause for modification**. If a class is responsible for several parts of the functionality provided by the software, it indicates that the class is becoming too complex, difficult to understand, extend, and maintain. The main goal of the SRP is to reduce complexity.

The **Car** class below can change for several reasons. Its primary responsibility is to manage car data, so it is expected to include methods for manipulating this data, such as getters and setters for car attributes. However, the class is also responsible for driving the car. We should transfer the responsibility of driving to the car owner and let the class focus solely on managing car data.

### Car Class Example

In the current implementation, the Car class manages both car data and the responsibility of driving. Here's a simplified TypeScript example:

```typescript
class Car {
  private make: string;
  private model: string;
  private year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarInfo(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }

  setCarInfo(make: string, model: string, year: number): void {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  drive(): void {
    console.log(`${this.make}, ${this.model} is driving itself`);
  }
}
```

We can refactor this by creating a **Driver** class and associating it with the **Car** class. Now, a driver can drive a car as they please:

```typescript
class Car {
  private make: string;
  private model: string;
  private year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarInfo(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }

  setCarInfo(make: string, model: string, year: number): void {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

class Driver {
  private name: string;
  private car: Car;

  constructor(name: string, car: Car) {
    this.name = name;
    this.car = car;
  }

  drive(): void {
    console.log(`${this.name} is driving the ${this.car.getCarInfo()}`);
  }
}
```

Now that the driving responsibility has been removed from the **Car** class, changes to the `drive` method will no longer affect the class, allowing for more customizable driving behavior for each driver.

## O: Open/Closed Principle

The Open/Closed Principle (OCP) states that **a class should be designed to allow extension, while preventing modification of its existing functionality**. One desirable goal when developing software is to ensure that existing code doesn't break when adding new features. If a class allows extensions, it can be said that the class is _open_. It is possible to create a subclass and perform various actions, such as adding new methods or fields and overriding base behavior. When a class is complete and its interface is clearly defined, it is said to be _closed_ - no more modifications are necessary.

### MusicalInstrument Class Example

In the example below, the **MusicalInstrument** class has a `play` method that prints information about how each instrument type should be played. The problem with this implementation is that it will need to be modified every time a new instrument type is added, requiring constant changes to the class.


```typescript
class MusicalInstrument {
  private name: string;
  private type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  play(): void {
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
```

As each instrument type has its unique playing style, we can define a common interface for **MusicalInstrument**, where the `play` method is declared. Each instrument type can then have its own class, implementing the `play` method accordingly.


```typescript
interface PlayableInstrument {
  name: string;
  play(): void;
}

abstract class MusicalInstrument2 implements PlayableInstrument {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract play(): void;
}

class ChordInstrument extends MusicalInstrument2 {
  play(): void {
    console.log(`${this.name} is played by strumming or plucking its strings.`);
  }
}

class KeyboardInstrument extends MusicalInstrument2 {
  play(): void {
    console.log(`${this.name} is played by pressing its keys.`);
  }
}

class WindInstrument extends MusicalInstrument2 {
  play(): void {
    console.log(`${this.name} is played by blowing air into it.`);
  }
}

class PercussionInstrument extends MusicalInstrument2 {
  play(): void {
    console.log(
      `${this.name} is played by striking it with hands or drumsticks.`,
    );
  }
}

class BowedStringInstrument extends MusicalInstrument2 {
  play(): void {
    console.log(`${this.name} is played by drawing a bow across its strings.`);
  }
}
```  

The **MusicalInstrument** class is _closed_ for modification because we don't need to change it to add new instrument types. It is _open_ for extension since we can easily create new instrument types by extending **MusicalInstrument** without altering existing code.

## L: Liskov Substitution Principle

The Liskov Substitution Principle (LSP) states that **when extending a class, ensure that objects of the subclass can be used in place of those of the parent class without causing issues in the client code**. The behavior of the subclass must be consistent with the behavior of the superclass. In contrast to other design principles, which can be subjective and open to interpretation, the LSP provides a clear set of formal requirements for subclasses and their methods:

- The parameter types in a subclass method should either match or be more general than those in the corresponding method of the superclass;
- The return type of a method in a subclass should either match or be a subtype of the return type in the corresponding method of the superclass;
- A method in a subclass should not throw exception types that are not expected by the base method;
- A subclass should not impose stricter pre-conditions; 
- A subclass should not impose less strict pre-conditions;
- The invariants of a superclass (what maintains the coherence of the class) must be preserved - least formal;
- A subclass should not modify the values of the superclass's private fields.

Let's examine an example of this principle being violated:

> TypeScript Implementation of code in the diagram on pages 62 and 63 from the book *Dive Into Design Patterns* by Alexander Shvets, Refactoring.Guru, 2022. Available at: [https://refactoring.guru/design-patterns/book](https://refactoring.guru/design-patterns/book)


Before refactoring:

```typescript
class Document {
  private data: unknown;
  private filename: string;

  constructor(data: unknown, filename: string) {
    this.data = data;
    this.filename = filename;
  }

  open(): void {
    console.log(`${this.filename} is open.`);
  }

  save(): void {
    console.log(`${this.filename} saved.`);
  }
}

class ReadOnlyDocument extends Document {
  save(): void {
    throw new Error("Unable to save read-only file.");
  }
}

class Project {
  private documents: Document[];

  constructor(documents: Document[]) {
    this.documents = documents;
  }

  openAll(): void {
    this.documents.forEach((document) => document.open());
  }

  saveAll(): void {
    this.documents.forEach((document) => {
      if (!(document instanceof ReadOnlyDocument)) {
        document.save();
      }
    });
  }
}
```

After refactoring:

```typescript
class Document {
  private data: unknown;
  filename: string;

  constructor(data: unknown, filename: string) {
    this.data = data;
    this.filename = filename;
  }

  open(): void {
    console.log(`${this.filename} is open.`);
  }
}

class WritableDocument extends Document {
  save(): void {
    console.log(`${this.filename} saved.`);
  }
}

class Project {
  private allDocs: Document[];
  private writableDocs: WritableDocument[];

  constructor(allDocs: Document[], writableDocs: WritableDocument[]) {
    this.allDocs = allDocs;
    this.writableDocs = writableDocs;
  }

  openAll(): void {
    this.allDocs.forEach((document) => document.open());
  }

  saveAll(): void {
    this.writableDocs.forEach((document) => document.save());
  }
}
```

Before refactoring, the implementation violated the LSP by introducing exception types not anticipated by the base method. Additionally, it breached the OCP by making the client code dependent on specific document subclasses. The issue can be resolved by restructuring the class hierarchy. Since not all documents are writable, the `save` method should not be part of the base **Document** class. Instead, a dedicated subclass for writable documents can be introduced, ensuring that only documents capable of being saved include this method. This approach aligns with the LSP and improves code maintainability.

## I: Interface Segregation Principle

The Interface Segregation Principle (ISP) states that **clients should not be required to rely on methods they do not utilize**. A client class should implement only the methods that are truly essential. Instead of using a single interface with an excessive number of methods, break it down into multiple refined interfaces and implement them in a class as needed.

> TypeScript Implementation of code in the diagram on pages 65 and 66 from the book *Dive Into Design Patterns* by Alexander Shvets, Refactoring.Guru, 2022. Available at: [https://refactoring.guru/design-patterns/book](https://refactoring.guru/design-patterns/book)

Before refactoring:

```typescript
interface CloudProvider {
  storeFile(name: string): void;
  getFile(name: string): void;
  createServer(region: string): void;
  listServers(region: string): void;
  getCDNAddress(): void;
}

class Amazon implements CloudProvider {
  storeFile(name: string): void {
    console.log(`File ${name} stored`);
  }
  getFile(name: string): void {
    console.log(`File ${name} returned`);
  }
  createServer(region: string): void {
    console.log(`Server created at region ${region}`);
  }
  listServers(region: string): void {
    console.log(`Server in region ${region}`);
  }
  getCDNAddress(): void {
    console.log(`The CDN Address`);
  }
}

class Dropbox implements CloudProvider {
  storeFile(name: string): void {
    console.log(`File ${name} stored`);
  }
  getFile(name: string): void {
    console.log(`File ${name} returned`);
  }
  createServer(_region: string): void {
    throw new Error("Method not implemented.");
  }
  listServers(_region: string): void {
    throw new Error("Method not implemented.");
  }
  getCDNAddress(): void {
    throw new Error("Method not implemented.");
  }
}
```

After refactoring:

```typescript
interface CloudHostingProvider {
  createServer(region: string): void;
  listServers(region: string): void;
}

interface CDNProvider {
  getCDNAddress(): void;
}

interface CloudStorageProvider {
  storeFile(name: string): void;
  getFile(name: string): void;
}

class Amazon
  implements CloudHostingProvider, CDNProvider, CloudStorageProvider
{
  storeFile(name: string): void {
    console.log(`File ${name} stored`);
  }
  getFile(name: string): void {
    console.log(`File ${name} returned`);
  }
  createServer(region: string): void {
    console.log(`Server created at region ${region}`);
  }
  listServers(region: string): void {
    console.log(`Server in region ${region}`);
  }
  getCDNAddress(): void {
    console.log(`The CDN Address`);
  }
}

class Dropbox implements CloudStorageProvider {
  storeFile(name: string): void {
    console.log(`File ${name} stored`);
  }
  getFile(name: string): void {
    console.log(`File ${name} returned`);
  }
}
```

Before refactoring, the `Dropbox` class was forced to implement methods it would never use. By breaking the `CloudProvider` interface into smaller, more specialized interfaces, we effectively addressed this issue, ensuring that `Dropbox` only implements the functionalities relevant to its role.

## D: Dependency Inversion Principle

The Dependency Inversion Principle (DIP) states that **high-level classes should not rely on low-level classes; both should be based on abstractions. Additionally, abstractions should not be dependent on specific implementations — rather, implementations should be driven by abstractions**. It is common in software design to work with two main levels of classes: low-level and high-level classes. Low-level classes handle fundamental operations, while high-level classes contain complex business logic that orchestrates the actions of low-level classes. It is common for software to be initially built around its basic requirements, especially when the business logic is not yet fully defined. As a result, high-level classes may become dependent on low-level classes. 

The DIP proposes reversing the direction of this dependency. When a low-level class implements the interfaces that high-level classes depend on, it inherently ties itself to the business logic layer. This approach often aligns with OCP, as low-level classes can be extended to accommodate different business logic implementations without modifying existing code.

> TypeScript Implementation of code in the diagram on page 69 from the book *Dive Into Design Patterns* by Alexander Shvets, Refactoring.Guru, 2022. Available at: [https://refactoring.guru/design-patterns/book](https://refactoring.guru/design-patterns/book)

Before refactoring:

```typescript
// Low-level class
class MySqlDatabase {
  constructor() {}

  insert(): void {
    console.log("File inserted");
  }
  update(): void {
    console.log("File updated");
  }
  delete(): void {
    console.log("File deleted");
  }
}

// High-level class
class BudgetReport {
  private database: MySqlDatabase;

  constructor(database: MySqlDatabase) {
    this.database = database;
  }

  open(date: string): void {
    console.log(`Open report from ${date}`);
  }
  save(): void {
    this.database.insert();
  }
}
```

After refactoring:

```typescript
interface Database {
  insert(): void;
  update(): void;
  delete(): void;
}

class MySql implements Database {
  private static name = "MySql";

  constructor() {}

  update(): void {
    console.log(`File updated by ${MySql.name}`);
  }
  delete(): void {
    console.log(`File deleted by ${MySql.name}`);
  }
  insert(): void {
    console.log(`File inserted by ${MySql.name}`);
  }
}

class MongoDB implements Database {
  private static name = "MongoDB";

  constructor() {}

  update(): void {
    console.log(`File updated by ${MongoDB.name}`);
  }
  delete(): void {
    console.log(`File deleted by ${MongoDB.name}`);
  }
  insert(): void {
    console.log(`File inserted by ${MongoDB.name}`);
  }
}

class BudgetReport {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  open(date: string): void {
    console.log(`Open report from ${date}`);
  }
  save(): void {
    this.database.insert();
  }
}
```

Before refactoring, changes in the MySQLDatabase class (low-level class) can affect the BudgetReport class (high-level class), that was not meant to care about the details of storing data. After refactoring, by creating a high-level interface from which is used by the new low-level classes (MongoDB and MySQL), it is possible to make these classes implement the logic declared by the business logic, resulting in the inversion of the original dependency. Now the low-level classes are dependent on high-level abstractions. 

Before refactoring, any changes to the `MySQLDatabase` class (a low-level class) could impact the `BudgetReport` class (a high-level class), even though `BudgetReport` should not be concerned with the details of data storage. 

After refactoring, a high-level interface is introduced, which both `MongoDB` and `MySQL` (new low-level classes) implement. This allows them to adhere to the business logic's defined contract, effectively inverting the original dependency. As a result, the low-level classes now rely on high-level abstractions, ensuring that any modifications to them do not require changes to the high-level class.

## References

* Book reference: [Dive Into Design Patterns](https://refactoring.guru/design-patterns/book) by Alexander Shvets, Refactoring.Guru, 2022
