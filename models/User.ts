import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface UserAttributes {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: true,
      }
    );
  }
}
