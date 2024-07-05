import { DataTypes, Model, Sequelize } from "sequelize";
import { WikiPageRevision } from "./WikiPageRevision";

export interface WikiPageAttributes {
  id: number;
  title: string;
  language: string;
}

export class WikiPage
  extends Model<WikiPageAttributes>
  implements WikiPageAttributes
{
  id!: number;
  title!: string;
  language!: string;

  static initModel(sequelize: Sequelize): typeof WikiPage {
    return WikiPage.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "wiki_pages",
        modelName: "WikiPage",
        schema: "public",
        timestamps: true,
      }
    );
  }

  static async getLatestRevision(
    pageId: number
  ): Promise<WikiPageRevision | null> {
    return WikiPageRevision.findOne({
      where: { pageId },
      order: [["createdAt", "DESC"]],
    });
  }
}
