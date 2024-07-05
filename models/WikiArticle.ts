import { DataTypes, Model, Sequelize } from "sequelize";
import { WikiArticleRevision } from "./WikiArticleRevision";

export interface WikiArticleAttributes {
  id: number;
  pageId: number;
  title: string;
  language: string;
}

export class WikiArticle
  extends Model<WikiArticleAttributes>
  implements WikiArticleAttributes
{
  id!: number;
  pageId!: number;
  title!: string;
  language!: string;

  static initModel(sequelize: Sequelize): typeof WikiArticle {
    return WikiArticle.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        pageId: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        tableName: "wiki_articles",
        modelName: "WikiArticle",
        schema: "public",
        timestamps: true,
      }
    );
  }

  static async getLatestRevision(
    articleId: number
  ): Promise<WikiArticleRevision | null> {
    return WikiArticleRevision.findOne({
      where: { articleId },
      order: [["createdAt", "DESC"]],
    });
  }
}
