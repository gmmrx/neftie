import { DataTypes, Model } from "sequelize";
import * as Sequelize from "sequelize";
// EVENT_DETAILS Table
export interface EventDetailsAttributes {
  id: number;
  eventId: number;
  description: string;
  discordUrl: string;
  prizes: { order: number; prize: string }[];
  rules: string[];
  language: string;
}

export class EventDetails
  extends Model<EventDetailsAttributes>
  implements EventDetailsAttributes
{
  id!: number;
  eventId!: number;
  description!: string;
  discordUrl!: string;
  prizes!: { order: number; prize: string }[];
  rules!: string[];
  language!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof EventDetails {
    return EventDetails.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        eventId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "events", // Name of the Events table
            key: "id",
          },
          field: "event_id",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        discordUrl: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "discord_url",
        },
        prizes: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        rules: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "event_details",
        modelName: "EventDetails",
        schema: "public",
        timestamps: true, // Adjust as necessary
      }
    );
  }
}
