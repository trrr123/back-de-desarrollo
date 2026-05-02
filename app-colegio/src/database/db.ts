import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  dialect: "mysql" | "postgres" | "mssql" | "oracle";
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

const dbConfigurations: Record<string, DatabaseConfig> = {
  mysql: {
    dialect: "mysql",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_NAME || "colegio_horizonte",
    port: Number(process.env.MYSQL_PORT || 3306),
  },

  postgres: {
    dialect: "postgres",
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_NAME || "test",
    port: Number(process.env.POSTGRES_PORT || 5432),
  },

  mssql: {
    dialect: "mssql",
    host: process.env.MSSQL_HOST || "127.0.0.1",
    username: process.env.MSSQL_USER || "sa",
    password: process.env.MSSQL_PASSWORD || "",
    database: process.env.MSSQL_NAME || "test",
    port: Number(process.env.MSSQL_PORT || 1433),
  },

  oracle: {
    dialect: "oracle",
    host: process.env.ORACLE_HOST || "127.0.0.1",
    username: process.env.ORACLE_USER || "system",
    password: process.env.ORACLE_PASSWORD || "",
    database: process.env.ORACLE_NAME || "xe",
    port: Number(process.env.ORACLE_PORT || 1521),
  },
};

const selectedEngine = process.env.DB_ENGINE ?? "mysql";
const selectedConfig = dbConfigurations[selectedEngine];

if (!selectedConfig) {
  throw new Error(`Motor de base de datos no soportado: ${selectedEngine}`);
}

console.log(`Conectando a: ${selectedEngine}`);

export const sequelize = new Sequelize({
  database: selectedConfig.database,
  username: selectedConfig.username,
  password: selectedConfig.password,
  host: selectedConfig.host,
  port: selectedConfig.port,
  dialect: selectedConfig.dialect === "oracle" ? "postgres" : selectedConfig.dialect,
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions:
    selectedConfig.dialect === "mysql"
      ? {
          connectTimeout: 30000,
        }
      : selectedConfig.dialect === "mssql"
      ? {
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        }
      : {},
});

export const getDatabaseInfo = () => ({
  engine: selectedEngine,
  host: selectedConfig.host,
  port: selectedConfig.port,
  database: selectedConfig.database,
  username: selectedConfig.username,
});

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log(`Conexión exitosa a ${selectedEngine}`);
    return true;
  } catch (error) {
    console.error(`Error de conexión a ${selectedEngine}:`, error);
    return false;
  }
};