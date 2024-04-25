import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface VideoCategoryListAttributes {
  video_id: number;
  category_id: number;
}

export class VideoCategoryList
  extends Model<VideoCategoryListAttributes>
  implements VideoCategoryListAttributes
{
  video_id!: number;
  category_id!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof VideoCategoryList {
    return VideoCategoryList.init(
      {
        video_id: {
          type: DataTypes.INTEGER,
          references: { model: "videos", key: "id" },
          primaryKey: true,
        },
        category_id: {
          type: DataTypes.INTEGER,
          references: { model: "video_categories", key: "id" },
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: "video_category_list",
        modelName: "VideoCategoryList",
        timestamps: false,
      }
    );
  }
}
