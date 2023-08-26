class BaseRepository {
  table: string;
  constructor(table: string) {
    this.table = table;
  }

  getAllValuesFrom(table_: string): string {
    return `select * from ${table_}`;
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
