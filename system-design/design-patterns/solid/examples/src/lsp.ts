// Example 1: before refactoring

class Document1 {
  private data: unknown;
  filename: string;

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

class ReadOnlyDocument extends Document1 {
  save(): void {
    throw new Error("Unable to save read-only file.");
  }
}

class Project1 {
  private documents: Document1[];

  constructor(documents: Document1[]) {
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

const doc1_1 = new Document1("Report data 1", "report1.txt");
const doc1_2 = new ReadOnlyDocument("Confidential data 1", "confidential1.txt");
const doc1_3 = new Document1("Notes 1", "notes1.txt");
const project1 = new Project1([doc1_1, doc1_2, doc1_3]);

console.log("Example 1:\n");
project1.saveAll();

// Example 2: after refactoring

class Document2 {
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

class WritableDocument extends Document2 {
  save(): void {
    console.log(`${this.filename} saved.`);
  }
}

class Project2 {
  private allDocs: Document2[];
  private writableDocs: WritableDocument[];

  constructor(allDocs: Document2[], writableDocs: WritableDocument[]) {
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

const doc2_1 = new WritableDocument("Report data 2", "report2.txt");
const doc2_2 = new Document2("Confidential data 2", "confidential2.txt");
const doc2_3 = new WritableDocument("Notes2", "notes2.txt");
const project2 = new Project2([doc2_1, doc2_2, doc2_3], [doc2_1, doc2_3]);

console.log("\nExample 2:\n");
project2.saveAll();
