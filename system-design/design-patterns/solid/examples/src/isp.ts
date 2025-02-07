// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const handleNotImplementedMethod = (func: Function, param?: string) => {
  try {
    return param ? func(param) : func();
  } catch (error) {
    console.log(`${(error as Error).message}`);
  }
};

// Example 1: before refactoring

interface CloudProvider {
  storeFile(name: string): void;
  getFile(name: string): void;
  createServer(region: string): void;
  listServers(region: string): void;
  getCDNAddress(): void;
}

class Amazon1 implements CloudProvider {
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

class Dropbox1 implements CloudProvider {
  storeFile(name: string): void {
    console.log(`File ${name} stored`);
  }
  getFile(name: string): void {
    console.log(`File ${name} returned`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createServer(_region: string): void {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listServers(_region: string): void {
    throw new Error("Method not implemented.");
  }
  getCDNAddress(): void {
    throw new Error("Method not implemented.");
  }
}

console.log("Example 1:\n");
console.log("Amazon Class\n");
const amz1 = new Amazon1();
amz1.storeFile("amz1");
amz1.getFile("amz1");
amz1.createServer("us-east-1");
amz1.listServers("us-east-1");
amz1.getCDNAddress();

console.log("\nDropbox Class\n");
const dropbox1 = new Dropbox1();
dropbox1.storeFile("dropbox1");
dropbox1.getFile("dropbox1");
handleNotImplementedMethod(dropbox1.createServer, "us-east-1");
handleNotImplementedMethod(dropbox1.listServers, "us-east-1");
handleNotImplementedMethod(dropbox1.getCDNAddress, "us-east-1");

// Example 2: after refactoring

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

class Amazon2
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

class Dropbox2 implements CloudStorageProvider {
  storeFile(name: string): void {
    console.log(`File ${name} stored`);
  }
  getFile(name: string): void {
    console.log(`File ${name} returned`);
  }
}

console.log("\nExample 2:\n");
console.log("Amazon Class\n");
const amz2 = new Amazon2();
amz2.storeFile("amz2");
amz2.getFile("amz2");
amz2.createServer("us-east-1");
amz2.listServers("us-east-1");
amz2.getCDNAddress();

console.log("\nDropbox Class\n");
const dropbox2 = new Dropbox2();
dropbox2.storeFile("dropbox2");
dropbox2.getFile("dropbox2");
