import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  firstPublished?: string;
}

const MainNews = ({ news }: { news: NewsCardProps[] }) => {
  // প্রথম news-টি main news
  const fastNews: NewsCardProps = news[0];

  // বাকি news
  const otherNews = news.slice(1);

  // যদি news না থাকে
  if (!fastNews) {
    return (
      <div className="py-10 text-center text-gray-500">
        No news available
      </div>
    );
  }

  // Published Date
  const publishedDate = fastNews.firstPublished
    ? new Date(fastNews.firstPublished).toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    : "";

  // Published Time
  const time = fastNews.firstPublished
    ? new Date(fastNews.firstPublished).toLocaleTimeString("bn-BD", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* ================= LEFT - MAIN NEWS ================= */}

      <Link
        href={`/news/${fastNews.id}`}
        className="col-span-1 block overflow-hidden rounded-xl border border-gray-200 bg-white"
      >
        <article>
          {/* Image */}
          <div className="h-[240px] w-full overflow-hidden bg-gray-100">
            <Image
              src={fastNews.imageUrl}
              alt={fastNews.imageAlt || "News image"}
              width={640}
              height={360}
              className="h-full w-full object-cover transition duration-300 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="px-5 pb-5 pt-5">
            {/* Category */}
            <p className="mb-2 text-[15px] font-semibold text-[#c90000]">
              {fastNews.category}
            </p>

            {/* Title */}
            <h2 className="text-[25px] font-bold leading-[1.35] text-[#171717] transition hover:text-[#c90000]">
              {fastNews.title}
            </h2>

            {/* Description */}
            <p className="mt-3 line-clamp-3 text-[17px] leading-[1.6] text-[#555]">
              {fastNews.description}
            </p>

            {/* Date & Time */}
            {fastNews.firstPublished && (
              <p className="mt-3 text-[14px] text-[#aaa]">
                {publishedDate} এ {time}
              </p>
            )}
          </div>
        </article>
      </Link>

      {/* ================= RIGHT - OTHER NEWS ================= */}

      <div className="col-span-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {otherNews.slice(0, 4).map((news: NewsCardProps) => (
          <Link key={news.id} href={`/news/${news.id}`}>
            <div className="block border-b border-gray-200 px-5 py-5 transition last:border-b-0 hover:bg-gray-50">
              {/* Category */}
              <p className="mb-2 text-[15px] font-semibold text-[#c90000]">
                {news.category}
              </p>

              {/* Title */}
              <h3 className="text-[15px] font-semibold leading-[1.45] text-[#171717]">
                {news.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;