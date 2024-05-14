import { example_eggs } from "./data/eggs";

import { NeftieList } from "./data/nefties";
import { models } from "./db";

export async function syncAndForceDB() {
  // await models.User.sync({ force: true, alter: true });
  // await models.VideoCategory.sync({ force: true, alter: true });
  // await models.Video.sync({ force: true, alter: true });
  // await models.VideoCategoryList.sync({ force: true, alter: true });
  // await models.Nefties.sync({ force: true, alter: true });
  // await models.Events.sync({ force: true, alter: true });
  // await models.EventDetails.sync({ force: true, alter: true });
  // await models.Eggs.sync({ force: true, alter: true });
  // await models.EggsNefties.sync({ force: true, alter: true });
  // await models.VideoCategory.bulkCreate([
  //   {
  //     name: "tutorials.title",
  //     description: "tutorials.desc",
  //     slug: "tutorial",
  //   },
  //   {
  //     name: "official_stream_recordings.title",
  //     description: "official_stream_recordings.desc",
  //     slug: "official-streams",
  //   },
  //   {
  //     name: "funny_moments.title",
  //     description: "funny_moments.desc",
  //     slug: "funny-moments",
  //   },
  //   {
  //     name: "cringe_moments.title",
  //     description: "cringe_moments.desc",
  //     slug: "cringe-moments",
  //   },
  // ]);
  // for (const neftie of NeftieList) {
  //   await models.Nefties.create({ ...neftie });
  // }
  // for (const egg of example_eggs) {
  //   await models.Eggs.create({ ...egg });
  // }
}
