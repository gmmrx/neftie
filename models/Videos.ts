import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface VideoAttributes {
  id: number;
  name: string;
  description: string;
  yt_url: string;
  is_official: boolean;
  is_for_children: boolean;
  user_id: number;
  locale: string;
  thumbnail: string;
  status: string;
}

export class Video extends Model<VideoAttributes> implements VideoAttributes {
  id!: number;
  name!: string;
  description!: string;
  yt_url!: string;
  is_official!: boolean;
  is_for_children!: boolean;
  user_id!: number;
  locale!: string;
  thumbnail!: string;
  status!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Video {
    return Video.init(
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
          allowNull: true, // Assuming description can be nullable
        },
        yt_url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_official: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_for_children: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users", // Assuming your User model's tableName is 'users'
            key: "id",
          },
        },
        locale: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        thumbnail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "videos",
        modelName: "Video",
      }
    );
  }
}
