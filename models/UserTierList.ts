import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface UserTierListAttributes {
  id: number;
  userId: number;
  patchVersionId: number;
  sTier: number[]; // Assuming an array of Neftie IDs for simplicity
  aTier: number[];
  bTier: number[];
  createdAt: Date;
  updatedAt: Date;
}

export class UserTierList
  extends Model<UserTierListAttributes>
  implements UserTierListAttributes
{
  id!: number;
  userId!: number;
  patchVersionId!: number;
  sTier!: number[];
  aTier!: number[];
  bTier!: number[];
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserTierList {
    return UserTierList.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users", // Assuming your User model's tableName is 'users'
            key: "id",
          },
        },
        patchVersionId: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        sTier: {
          type: DataTypes.ARRAY(DataTypes.INTEGER), // Adjust based on your DB's support for array types
          allowNull: false,
        },
        aTier: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: false,
        },
        bTier: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
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
        tableName: "user_tier_lists", // Name the table as you see fit
        modelName: "UserTierList",
        timestamps: true,
      }
    );
  }
}
