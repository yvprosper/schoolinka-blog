import { Transaction, Sequelize } from "sequelize";
import { Table } from "../support/interfaces";

// Function to run Sequelize queries in a transaction
export async function runQueriesInTransaction(
  queries: (transaction: Transaction) => Promise<Table>,
  sequelize: Sequelize
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    // Start a transaction
    const transaction: Transaction = await sequelize.transaction();
    try {
      // Execute the provided queries within the transaction
      const result: Table = await queries(transaction);

      // Commit the transaction if all queries succeed
      await transaction.commit();

      resolve(result);
    } catch (error) {
      // If any query fails, roll back the transaction
      await transaction.rollback();
      reject(error);
    }
  });
}
