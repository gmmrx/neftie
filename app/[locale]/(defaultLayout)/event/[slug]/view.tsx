"use client";

import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import Link from "next/link";
import { getStatus } from "@/components/event-box";

const EventPage: NextPage = ({ eventData }) => {
  const { t, i18n } = useTranslation();

  function getHtmlFromLexicalNode(node: {
    type: string;
    children?: Array<{ type: string; text?: string; tag?: string }>;
  }): string {
    let result = "";
    const { children } = node;
    if (children) {
      if (children.length === 0) {
        return result;
      }
      children.forEach((child) => {
        const { type, format } = child;

        if (type === "paragraph") {
          result += `<p class="my-4">${getHtmlFromLexicalNode(child)}</p>`;
        } else if (type === "heading") {
          const tag = child.tag ?? "h1";
          result += `<${tag}>${getHtmlFromLexicalNode(child)}</${tag}>`;
        } else if (type === "text" && format !== 1) {
          result += `<span>${child.text}</span>`;
        } else if (type === "text" && format === 1) {
          result += `<strong>${child.text}</strong>`;
        } else {
          result += `<br />`;
        }
      });
    }
    return result;
  }

  const htmlString = getHtmlFromLexicalNode(
    JSON.parse(eventData.details.description).root
  );
  const status = getStatus(eventData.startsAt, eventData.endsAt);
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem] mx-auto overflow-y-scroll no-scrollbar">
      <div className="flex flex-col md:flex-row justify-center md:justify-auto items-center md:items-start">
        <div className="p-4 rounded-sm w-full text-center md:text-left">
          <div className="flex justify-between items-center flex-col md:items-start">
            <h1 className="scroll-m-20 pb-2 text-3xl font-normal tracking-tight first:mt-0">
              <strong className="bg-secondary p-2 rounded-sm">
                {eventData.name}
              </strong>
            </h1>
            <div className="flex items-center mt-2 ml-1">
              <span
                className={`px-2 py-1 rounded-sm leading-none text-[10px] font-semibold uppercase ${
                  status === "ONGOING"
                    ? "bg-green-100 text-green-800"
                    : status === "INCOMING"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {t(`translation:${status.toLowerCase()}`)}
              </span>
            </div>
          </div>
          <div className="pl-0 flex flex-col lg:flex-row justify-between mt-4 flex-wrap font-normal mr-8">
            <div dangerouslySetInnerHTML={{ __html: htmlString }} />
          </div>
        </div>
        <div className="right-bar">
          <div className="bg-black px-3 rounded-sm py-2 border text-sm mb-2 w-full md:w-[250px] text-center">
            {t("translation:start_date")}:{" "}
            {format(eventData.startsAt, "dd MMM yyyy")}
          </div>

          <div className="bg-black px-3 rounded-sm py-2 border text-sm mb-2 w-[250px] text-center">
            {t("translation:end_date")}:{" "}
            {format(eventData.endsAt, "dd MMM yyyy")}
          </div>

          <div className="bg-black px-3 rounded-sm py-2 border text-sm mb-2 w-[250px] text-center">
            Discord:{" "}
            <Link href={eventData.details.discordUrl}>
              {eventData.details.discordUrl}
            </Link>
          </div>
          <div className="bg-black px-3 rounded-sm py-2 border text-sm mb-2 w-[250px] text-center">
            <div className="border-b mb-2"> {t("translation:prizes")}</div>
            <ol className="text-left w-full">
              {eventData.details.prizes &&
                eventData.details.prizes.length > 0 &&
                eventData.details.prizes.map((prize: any) => (
                  <li key={prize.order} className="flex justify-between w-full">
                    {prize.order}{" "}
                    <div>
                      {prize.prize} ${prize.currency}{" "}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
          <div className="bg-black px-3 rounded-sm py-2 border text-sm mb-2 w-[250px] text-center">
            <div className="border-b mb-2"> {t("translation:rules")}</div>
            <ol className="text-left list-decimal pl-4">
              {eventData.details.rules &&
                eventData.details.rules.length > 0 &&
                eventData.details.rules.map((rule: string) => (
                  <li key={rule}>{rule}</li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
