import type { Sequelize } from "sequelize";
import { Nefties } from "./Nefties"; // Adjust the path as necessary
import { Eggs } from "./Eggs"; // Adjust the path as necessary
import { EggsNefties } from "./EggNefties"; // Adjust the path as necessary
import { User } from "./User"; // Adjust the path as necessary
import { UserTierList } from "./UserTierList"; // Adjust the path as necessary
import { VideoCategory } from "./VideoCategories";
import { Video } from "./Videos";
import { VideoCategoryList } from "./VideoCategoryList";

export function initModels(sequelize: Sequelize) {
  Nefties.initModel(sequelize);
  Eggs.initModel(sequelize);
  EggsNefties.initModel(sequelize);
  User.initModel(sequelize);
  UserTierList.initModel(sequelize);
  VideoCategory.initModel(sequelize);
  Video.initModel(sequelize);
  VideoCategoryList.initModel(sequelize);

  Nefties.belongsToMany(Eggs, {
    through: EggsNefties,
    foreignKey: "neftieId",
    as: "nefties",
    otherKey: "eggId",
  });
  Eggs.belongsToMany(Nefties, {
    through: EggsNefties,
    foreignKey: "eggId",
    as: "eggs",
    otherKey: "neftieId",
  });
  User.hasMany(UserTierList, { foreignKey: "userId" });
  UserTierList.belongsTo(User, { foreignKey: "userId" });

  Video.belongsToMany(VideoCategory, {
    through: VideoCategoryList,
    foreignKey: "video_id",
    otherKey: "category_id",
  });
  User.hasMany(Video, { foreignKey: "user_id" });
  Video.belongsTo(User, { foreignKey: "user_id" });
  VideoCategory.belongsToMany(Video, {
    through: VideoCategoryList,
    foreignKey: "category_id",
    otherKey: "video_id",
  });

  return {
    Nefties: sequelize.models.Nefties,
    Eggs: sequelize.models.Eggs,
    EggsNefties: sequelize.models.EggsNefties,
    User: sequelize.models.User,
    UserTierList: sequelize.models.UserTierList,
    Video: sequelize.models.Video,
    VideoCategory: sequelize.models.VideoCategory,
    VideoCategoryList: sequelize.models.VideoCategoryList,
  };
}
