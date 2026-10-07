// import React from 'react';

// const NewsDetails = async({params}:{params:{newsId:string}}) => {
//     const {newsId} = await params;
//     const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`)
//     const data = await res.json();
//     const news = data.data;
//     console.log(news)

//     return (
//         <div>
//             kire
//         </div>
//     );
// };

// export default NewsDetails;

import Image from "next/image";
import React from "react";

type Params = {
  newsId: string;
};

type Topic = {
  id: string | number;
  name: string;
};

type Author = {
  name: string;
};

type BodyItem = {
  type: "image" | "subheading" | "text";
  url?: string;
  altText?: string;
  caption?: string;
  text?: string;
};

type News = {
  title?: string;
  firstPublished?: string;
  topics?: Topic[];
  byline?: Author[];
  description?: {
    blocks?: Array<{
      model?: {
        blocks?: Array<{
          model?: {
            text?: string;
          };
        }>;
      };
    }>;
  };
  body?: BodyItem[];
  tags?: string[];
  sourceUrl?: string;
  source?: string;
};

const NewsDetails = async ({
  params,
}: {
  params: Promise<Params>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`
  );

  const data = await res.json();
  const news: News = data.data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Category / Topics */}
      <div className="mb-4 flex flex-wrap gap-2">
        {news?.topics?.map((topic: Topic) => (
          <span
            key={topic.id}
            className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600"
          >
            {topic.name}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
        {news?.title}
      </h1>

      {/* Author & Date */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div>
          <span className="font-semibold">By:</span>{" "}
          {news?.byline?.map((author: Author) => author.name).join(", ")}
        </div>

        <div>
          <span className="font-semibold">Published:</span>{" "}
          {news?.firstPublished
            ? new Date(news.firstPublished).toLocaleDateString("bn-BD")
            : ""}
        </div>
      </div>

      {/* Main Image */}
      <div className="mb-8 overflow-hidden rounded-xl">
        {/* 
        <Image
          src={news.imageUrl || ""}
          alt={news.title || "News image"}
          width={800}
          height={800}
          className="h-auto w-full object-cover"
        />
        */}
      </div>

      {/* Short Description */}
      <p className="mb-8 text-lg font-medium leading-8 text-gray-700">
        {
          news?.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text
        }
      </p>

      {/* Article Body */}
      <div className="space-y-8">
        {news?.body?.map((item: BodyItem, index: number) => {
          // Image
          if (item.type === "image") {
            return (
              <figure key={index} className="my-8">
                {item.url && (
                  <Image
                    src={item.url}
                    alt={
                      item.altText ||
                      item.caption ||
                      news.title ||
                      "News image"
                    }
                    width={800}
                    height={800}
                    className="w-full rounded-xl"
                  />
                )}

                {item.caption && (
                  <figcaption className="mt-2 text-sm leading-6 text-gray-500">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          // Subheading
          if (item.type === "subheading") {
            return (
              <h2
                key={index}
                className="mt-10 text-2xl font-bold text-gray-900 md:text-3xl"
              >
                {item.text}
              </h2>
            );
          }

          // Text
          if (item.type === "text") {
            return (
              <p
                key={index}
                className="whitespace-pre-line text-base leading-8 text-gray-700 md:text-lg"
              >
                {item.text}
              </p>
            );
          }

          return null;
        })}
      </div>

      {/* Tags */}
      <div className="mt-10 border-t border-gray-200 pt-6">
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {news?.tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Source */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">
          Source:{" "}
          <a
            href={news?.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-600 hover:underline"
          >
            {news?.source}
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsDetails;