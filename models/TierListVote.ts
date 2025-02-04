import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface TierListVoteAttributes {
  id: number;
  tierListId: number;
  userId: number;
  vote: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TierListVote
  extends Model<TierListVoteAttributes>
  implements TierListVoteAttributes
{
  id!: number;
  tierListId!: number;
  userId!: number;
  vote!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof TierListVote {
    return TierListVote.init(
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
        vote: {
          type: DataTypes.BOOLEAN,
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
        tableName: "tier_list_votes",
        modelName: "TierListVote",
        timestamps: true,
      }
    );
  }
}
