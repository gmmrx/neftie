import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
export interface NeftiesAttributes {
  id: number;
  name: string;
  description: string;
  element: string;
  image: string;
  slug: string;
  skills: { icon: string; name: string; description: string }[];
  role: string | null;
  difficulty: string | null; // Added difficulty field
  createdAt: Date;
  updatedAt: Date;
}

export class Nefties
  extends Model<NeftiesAttributes>
  implements NeftiesAttributes
{
  id!: number;
  name!: string;
  description!: string;
  element!: string;
  image!: string;
  slug!: string;
  skills!: { icon: string; name: string; description: string; hype: string }[];
  role!: string | null;
  difficulty!: string | null; // Added difficulty field
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Nefties {
    return Nefties.init(
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
          allowNull: false,
        },
        element: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        skills: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        difficulty: {
          type: DataTypes.ENUM("EASY", "NORMAL", "HARD", "HARDEST"),
          allowNull: true,
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
        tableName: "nefties",
        modelName: "Nefties",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
