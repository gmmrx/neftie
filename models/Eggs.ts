import { DataTypes, Model } from "sequelize";
import * as Sequelize from "sequelize";

export interface EggsAttributes {
  id: number;
  name: string;
  description: string;
  image: string;
  foundAt: string[]; // Storing as a JSON string
}

export class Eggs extends Model<EggsAttributes> implements EggsAttributes {
  id!: number;
  name!: string;
  image!: string;
  description!: string;
  foundAt!: string[];

  static initModel(sequelize: Sequelize.Sequelize): typeof Eggs {
    return Eggs.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        foundAt: {
          type: DataTypes.JSON, // Adjust according to your database support
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "eggs",
        modelName: "Eggs",
        schema: "public",
        timestamps: false, // Assuming no need for createdAt/updatedAt, adjust as necessary
      }
    );
  }
}
