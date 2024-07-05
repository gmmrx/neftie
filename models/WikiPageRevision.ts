import { DataTypes, Model, Sequelize } from "sequelize";

export interface WikiPageRevisionAttributes {
  id: number;
  pageId: number;
  userId: number;
  content: string;
  language: string;
  createdAt: Date;
}

export class WikiPageRevision
  extends Model<WikiPageRevisionAttributes>
  implements WikiPageRevisionAttributes
{
  id!: number;
  pageId!: number;
  userId!: number;
  content!: string;
  language!: string;
  createdAt!: Date;

  static initModel(sequelize: Sequelize): typeof WikiPageRevision {
    return WikiPageRevision.init(
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
        tableName: "wiki_page_revisions",
        modelName: "WikiPageRevision",
        schema: "public",
        timestamps: false,
      }
    );
  }
}
