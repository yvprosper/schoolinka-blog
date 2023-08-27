class BaseRepository {
  table: string;
  constructor(table: string) {
    this.table = table;
  }

  getAllValuesFrom(table_: string): string {
    let selectedColumns: string[];
    table_ === "users"
      ? (selectedColumns = ["id", "first_name", "last_name", "email", "gender", "created_on"])
      : (selectedColumns = ["*"]);
    return `SELECT ${selectedColumns!.join(", ")} FROM ${table_}`;
  }

  getByCol() {
    return (col: string): string => {
      return `select * from ${this.table} where ${col} = $1;`;
    };
  }

  getByColThenDelete() {
    return (col: string): string => {
      return `delete from ${this.table} where ${col} = $1;`;
    };
  }
}

export default BaseRepository;
