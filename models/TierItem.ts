import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface TierItemAttributes {
  id: number;
  tierId: number;
  neftieId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class TierItem
  extends Model<TierItemAttributes>
  implements TierItemAttributes
{
  id!: number;
  tierId!: number;
  neftieId!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TierItem {
    return TierItem.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        tierId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "tiers",
            key: "id",
          },
        },
        neftieId: {
          type: DataTypes.INTEGER,
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
        tableName: "tier_items",
        modelName: "TierItem",
        timestamps: true,
      }
    );
  }
}
