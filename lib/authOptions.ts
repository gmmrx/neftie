import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { models } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_SECRET,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const dbUser = await models.User.findOne({
        where: { username: user.name },
      });

      if (dbUser) {
        // Update existing user's picture
        await dbUser.update({
          picture: user.image, // Discord provides the avatar URL in user.image
        });
        return true;
      } else {
        // Create new user with picture
        const newUser = await models.User.create({
          username: user.name,
          picture: user.image,
        });
        return true;
      }
    },
    jwt: async ({ token, user, account, profile }) => {
      const access_token = account?.access_token;

      if (access_token) {
        const dbUser = await models.User.findOne({
          where: { username: user?.name },
        });
        let isUserMemberOfAuroryDiscord = false;
        await fetch("https://discordapp.com/api/users/@me/guilds", {
          headers: {
            Authorization: "Bearer " + account?.access_token,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (myJson) {
            // AURORY GUILD ID 836601552130801676
            const checkUsersAuroryMembership = myJson.find(
              (guild) => guild.name === "Aurory"
            );

            if (checkUsersAuroryMembership) {
              isUserMemberOfAuroryDiscord = true;
            }
          });
        const adminsArr = process.env.ADMINS?.split(",");

        token.username = user.name;
        token.id = dbUser?.dataValues.id;
        token.isAuroryMember = isUserMemberOfAuroryDiscord;
        token.isAdmin = adminsArr?.find((admin) => admin === user.name);
        token.picture = user.image;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user.picture = token.picture;
        session.user.username = token.username;
        session.user.id = token?.id;
        session.user.isAuroryMember = token.isAuroryMember;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
