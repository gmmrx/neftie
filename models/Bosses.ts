import * as Sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
export interface BossesAttributes {
  id: number;
  name: string;
  image: string;
  description: string;
  hp: number;
  atk: number;
  def: number;
  sp: number;
  type: string; // New field
  lang: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Bosses
  extends Model<BossesAttributes>
  implements BossesAttributes
{
  id!: number;
  name!: string;
  image!: string;
  description!: string;
  hp!: number;
  atk!: number;
  def!: number;
  sp!: number;
  type!: string; // New field
  lang!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof Bosses {
    return Bosses.init(
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
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        hp: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        atk: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        def: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sp: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("ELITE", "BOSS"),
          allowNull: false,
          defaultValue: "BOSS",
        },
        lang: {
          type: DataTypes.STRING,
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
        tableName: "bosses",
        modelName: "Bosses",
        schema: "public",
        timestamps: true,
      }
    );
  }
}
