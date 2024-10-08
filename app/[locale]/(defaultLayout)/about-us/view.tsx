"use client";

import { NextPage } from "next";

const AboutUs: NextPage = () => {
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] mx-auto max-w-[70rem]">
      <div className="rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="">About Us</strong>
          </h2>
        </div>

        <div className="scroll-m-20 text-lg font-normal mt-3">
          <strong> Neftie App</strong> is an open-source project developed by{" "}
          <a href="https://x.com/gumm3rr" target="_blank" rel="nofollow">
            Gummer
          </a>{" "}
          in Q3 2024 to help Seekers of Tokane players improve their
          understanding and competitiveness.
          <div className="my-4" />
          Since its launch, numerous small projects have been developed, and
          several collaborations have been made:
          <ul className="my-4">
            <li>
              <strong>
                <a
                  href="https://github.com/ChocooDEV/aurory_nefties_sales_bot"
                  target="_blank"
                  rel="nofollow"
                >
                  Neftie Sales Twitter App
                </a>
              </strong>{" "}
              -{" "}
              <a
                href="https://x.com/chocoo_web3"
                target="_blank"
                rel="nofollow"
              >
                chocopanda
              </a>
            </li>
            <li>
              <strong>
                <a
                  href="https://github.com/gmmrx/neftie-discord-app"
                  target="_blank"
                  rel="nofollow"
                >
                  Neftie App Discord Bot
                </a>
              </strong>{" "}
              -{" "}
              <a href="https://x.com/gumm3rr" target="_blank" rel="nofollow">
                Gummer
              </a>
            </li>
            <li>
              <strong>
                <a href="/tutorials" target="_blank" rel="nofollow">
                  Tutorials for Beginners
                </a>
              </strong>{" "}
              -{" "}
              <a href="https://x.com/BagsBuns" target="_blank" rel="nofollow">
                BunsBagsandCaps
              </a>
            </li>
            <li>
              <strong>Neftie Skill Videos & Ad Video</strong> -{" "}
              <a href="https://x.com/DeGen_Zard" target="_blank" rel="nofollow">
                DeGen Zard
              </a>{" "}
              &{" "}
              <a href="https://x.com/Beccss__x" target="_blank" rel="nofollow">
                Becks
              </a>
            </li>

            <li>
              <strong>Help with Graphics & Images</strong> -{" "}
              <a href="https://x.com/Beccss__x" target="_blank" rel="nofollow">
                Becks
              </a>
            </li>
          </ul>
          <div className="font-normal text-lg">
            Our journey with Neftie App has always been fueled by the passion
            and creativity of the Seekers of Tokane community. Each
            collaboration, from helpful tutorials to engaging content, has
            brought us closer to our goal of empowering players and enhancing
            the game experience.
            <div className="my-4" />
            At its core, Neftie App is more than just a project; it's a shared
            endeavor that thrives on community contributions and partnerships.
            Together, we've created something truly special, and we’re excited
            for what the future holds as we continue to grow and innovate.
            <div className="my-4" />
            <strong>By the community, for the community</strong> — this is the
            heart of Neftie App, and we're proud to keep building it alongside
            all of you.
            <div className="my-4" />
            To stay updated on our latest developments, tutorials, and community
            collaborations, make sure to follow us on X! Join the conversation
            and be part of our growing community:
            <div className="my-4" />
            Follow us on X:{" "}
            <a href="https://x.com/neftieapp" target="_blank">
              <strong>@NeftieApp</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
