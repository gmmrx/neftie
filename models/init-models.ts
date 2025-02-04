import type { Sequelize } from "sequelize";
import { Nefties } from "./Nefties"; // Adjust the path as necessary
import { Eggs } from "./Eggs"; // Adjust the path as necessary
import { EggsNefties } from "./EggNefties"; // Adjust the path as necessary
import { User } from "./User"; // Adjust the path as necessary
import { UserTierList } from "./UserTierList"; // Adjust the path as necessary
import { VideoCategory } from "./VideoCategories";
import { Video } from "./Videos";
import { VideoCategoryList } from "./VideoCategoryList";
import { Events } from "./Events";
import { EventDetails } from "./EventDetails";
import { Bosses } from "./Bosses";
import { Tier } from "./Tier";
import { TierItem } from "./TierItem";
import { TierListVote } from "./TierListVote";
import { TierListComment } from "./TierListComment";

export function initModels(sequelize: Sequelize) {
  Nefties.initModel(sequelize);
  Eggs.initModel(sequelize);
  EggsNefties.initModel(sequelize);
  User.initModel(sequelize);
  UserTierList.initModel(sequelize);
  VideoCategory.initModel(sequelize);
  Video.initModel(sequelize);
  VideoCategoryList.initModel(sequelize);
  Events.initModel(sequelize);
  EventDetails.initModel(sequelize);
  Bosses.initModel(sequelize);
  Tier.initModel(sequelize);
  TierItem.initModel(sequelize);
  TierListVote.initModel(sequelize);
  TierListComment.initModel(sequelize);

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

  UserTierList.hasMany(Tier, { foreignKey: "tierListId", as: "tiers" });
  Tier.belongsTo(UserTierList, { foreignKey: "tierListId" });

  UserTierList.hasMany(TierListVote, { foreignKey: "tierListId", as: "votes" });
  TierListVote.belongsTo(UserTierList, { foreignKey: "tierListId" });

  UserTierList.hasMany(TierListComment, {
    foreignKey: "tierListId",
    as: "comments",
  });
  TierListComment.belongsTo(UserTierList, { foreignKey: "tierListId" });

  Tier.hasMany(TierItem, { foreignKey: "tierId", as: "items" });
  TierItem.belongsTo(Tier, { foreignKey: "tierId" });

  User.hasMany(TierListVote, { foreignKey: "userId", as: "tierListVotes" });
  TierListVote.belongsTo(User, { foreignKey: "userId" });

  User.hasMany(TierListComment, {
    foreignKey: "userId",
    as: "tierListComments",
  });
  TierListComment.belongsTo(User, { foreignKey: "userId" });

  TierListComment.hasMany(TierListComment, {
    foreignKey: "parentCommentId",
    as: "replies",
  });
  TierListComment.belongsTo(TierListComment, {
    foreignKey: "parentCommentId",
    as: "parentComment",
  });
  return {
    Nefties: sequelize.models.Nefties,
    Eggs: sequelize.models.Eggs,
    EggsNefties: sequelize.models.EggsNefties,
    User: sequelize.models.User,
    UserTierList: sequelize.models.UserTierList,
    Bosses: sequelize.models.Bosses,
  };
}
