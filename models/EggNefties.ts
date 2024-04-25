import { DataTypes, Model } from "sequelize";
import * as Sequelize from "sequelize";

export interface EggsNeftiesAttributes {
  eggId: number;
  neftieId: number;
}

export class EggsNefties
  extends Model<EggsNeftiesAttributes>
  implements EggsNeftiesAttributes
{
  eggId!: number;
  neftieId!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof EggsNefties {
    return EggsNefties.init(
      {
        eggId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Eggs",
            key: "id",
          },
          allowNull: false,
          primaryKey: true,
        },
        neftieId: {
          type: DataTypes.INTEGER,
          references: {
            model: "Nefties",
            key: "id",
          },
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: "EggsNefties",
        modelName: "EggsNefties",
        schema: "public",
        timestamps: false, // Assuming no need for createdAt/updatedAt, adjust as necessary
      }
    );
  }
}
