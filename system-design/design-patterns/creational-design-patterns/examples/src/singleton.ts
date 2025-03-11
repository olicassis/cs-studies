class Database {
  private static instance: Database;

  private constructor() {
    console.log("Database initialized");
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query(sql: string) {
    console.log(`Query ${sql} executed`);
  }
}

class Application {
  main() {
    const foo = Database.getInstance();
    foo.query("SELECT * FROM table_1");

    const bar = Database.getInstance();
    bar.query("SELECT * FROM table_2");

    if (bar === foo) {
      console.log(
        "Singleton is working: 'bar' and 'foo' refer to the same instance.",
      );
    }
  }
}

console.log("Example:\n");
const app = new Application();
app.main();
