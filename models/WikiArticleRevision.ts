import { DataTypes, Model, Sequelize } from "sequelize";

export interface WikiArticleRevisionAttributes {
  id: number;
  articleId: number;
  userId: number;
  content: string;
  language: string;
  createdAt: Date;
}

export class WikiArticleRevision
  extends Model<WikiArticleRevisionAttributes>
  implements WikiArticleRevisionAttributes
{
  id!: number;
  articleId!: number;
  userId!: number;
  content!: string;
  language!: string;
  createdAt!: Date;

  static initModel(sequelize: Sequelize): typeof WikiArticleRevision {
    return WikiArticleRevision.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        articleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "wiki_article_revisions",
        modelName: "WikiArticleRevision",
        schema: "public",
        timestamps: false,
      }
    );
  }
}
