import { Sequelize } from "sequelize";
import pg from "pg";
import { initModels } from "@/models/init-models";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectModule: pg,
    timezone: "+03:00",
    logging: true,
    minifyAliases: true,
  }
);
const models = initModels(sequelize);

export { sequelize, models };
