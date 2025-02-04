import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface TierListCommentAttributes {
  id: number;
  tierListId: number;
  userId: number;
  parentCommentId: number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class TierListComment
  extends Model<TierListCommentAttributes>
  implements TierListCommentAttributes
{
  id!: number;
  tierListId!: number;
  userId!: number;
  parentCommentId!: number | null;
  content!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TierListComment {
    return TierListComment.init(
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
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        parentCommentId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "tier_list_comments",
            key: "id",
          },
        },
        content: {
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
        tableName: "tier_list_comments",
        modelName: "TierListComment",
        timestamps: true,
      }
    );
  }
}
