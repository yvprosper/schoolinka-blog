import dotenv from "dotenv";
dotenv.config();

interface AppConfig {
  // APP
  httpPort: string | undefined;
  env: string | undefined;

  // PSQL DB
  psqlDatabaseUri: string | undefined;

  // JWT
  jwtSecret: string | undefined;
}

const config: AppConfig = {
  // APP
  httpPort: process.env.PORT || process.env.HTTP_PORT,
  env: process.env.NODE_ENV,

  // PSQL DB
  psqlDatabaseUri: process.env.PSQL_CONNECTION_URL,

  // JWT
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
