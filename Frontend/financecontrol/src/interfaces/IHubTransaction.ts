import type { ICategory } from "./ICategory";
import type { IPeople } from "./IPeople";
import type { ITransaction } from "./ITransaction";

export interface IHubTransaction {
  people: IPeople;
  category: ICategory;
  transaction: ITransaction;
}