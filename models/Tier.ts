import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
export interface TierAttributes {
  id: number;
  tierListId: number;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Tier extends Model<TierAttributes> implements TierAttributes {
  id!: number;
  tierListId!: number;
  name!: string;
  color!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Tier {
    return Tier.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        tierListId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "user_tier_lists",
            key: "id",
          },
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        color: {
          type: DataTypes.TEXT,
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
        tableName: "tiers",
        modelName: "Tier",
        timestamps: true,
      }
    );
  }
}
