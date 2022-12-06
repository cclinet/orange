import Dexie from "dexie";

export class MyAppDatabase extends Dexie {
  models!: Dexie.Table<IModels, number>;

  constructor() {
    super("MyAppDatabase");

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      models: "++id, name, model",
    });
  }
}

export interface IModels {
  id?: number; // Primary key. Optional (auto_incremented)
  name: string; // name
  model: ArrayBuffer; // model bytes
}

export const db = new MyAppDatabase();