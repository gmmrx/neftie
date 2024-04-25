import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface VideoCategoryAttributes {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export class VideoCategory
  extends Model<VideoCategoryAttributes>
  implements VideoCategoryAttributes
{
  id!: number;
  name!: string;
  description!: string;
  slug!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof VideoCategory {
    return VideoCategory.init(
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
          allowNull: true,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "video_categories",
        modelName: "VideoCategory",
      }
    );
  }
}
