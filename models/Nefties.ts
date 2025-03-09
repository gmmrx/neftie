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
  hp_min: number | null;
  hp_max: number | null;
  atk_min: number | null;
  atk_max: number | null;
  def_min: number | null;
  def_max: number | null;
  speed_min: number | null;
  speed_max: number | null;
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
  hp_min!: number | null;
  hp_max!: number | null;
  atk_min!: number | null;
  atk_max!: number | null;
  def_min!: number | null;
  def_max!: number | null;
  speed_min!: number | null;
  speed_max!: number | null;

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
        hp_min: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        hp_max: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        atk_min: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        atk_max: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        def_min: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        def_max: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        speed_min: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        speed_max: {
          type: DataTypes.INTEGER,
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
