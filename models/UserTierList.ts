import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface UserTierListAttributes {
  id: number;
  userId: number;
  patchVersionId: number;
  title: string;
  description: string;
  slug: string;
  voteCount: number;
  viewCount: number;
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
  title!: string;
  description!: string;
  slug!: string;
  voteCount!: number;
  viewCount!: number;
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
            model: "users",
            key: "id",
          },
        },
        patchVersionId: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        voteCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        viewCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
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
        tableName: "user_tier_lists",
        modelName: "UserTierList",
        timestamps: true,
      }
    );
  }
}
