// Example 1: before refactoring

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
class BudgetReport1 {
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

console.log("Example 1:\n");
const budgetReport1 = new BudgetReport1(new MySqlDatabase());
budgetReport1.save();

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

console.log("\nExample 2:\n");
const budgetReport2 = new BudgetReport(new MySql());
budgetReport2.save();
const budgetReport3 = new BudgetReport(new MongoDB());
budgetReport3.save();
