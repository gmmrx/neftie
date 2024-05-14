import { DataTypes, Model } from "sequelize";
import * as Sequelize from "sequelize";

// EVENTS Table
export interface EventsAttributes {
  id: number;
  name: string;
  startsAt: Date;
  endsAt: Date;
  isOfficial: boolean;
  status: string;
}

export class Events
  extends Model<EventsAttributes>
  implements EventsAttributes
{
  id!: number;
  name!: string;
  startsAt!: Date;
  endsAt!: Date;
  isOfficial!: boolean;
  status!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Events {
    return Events.init(
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
        startsAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "starts_at",
        },
        endsAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "ends_at",
        },
        isOfficial: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          field: "is_official",
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "events",
        modelName: "Events",
        schema: "public",
        timestamps: true, // Adjust as necessary
      }
    );
  }
}
