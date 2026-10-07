
import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface RealData {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

const Marqrue = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const realData: RealData[] = data.data;

  return (
    <div className="w-full overflow-hidden bg-[#c90000]">
      <div className="container mx-auto flex h-[42px]">

        {/* সর্বশেষ */}
        <div className="flex h-full w-[120px] shrink-0 items-center justify-center bg-[#999]">
          <span className="text-[18px] leading-none text-[#222]">
            সর্বশেষ
          </span>
        </div>

        {/* Marquee */}
        <div className="flex h-full flex-1 items-center overflow-hidden">
          <MarqueeText
            className="!flex !h-full !items-center !leading-none"
            pauseOnHover={true}
            duration={13}
            direction="right"
          >
            {realData.map((news) => (
              <span
                key={news.id}
                className="flex h-full items-center"
              >
                {/* News Link */}
                <Link
                  href={`/news/${news.id}`}
                  className="
                    mx-7
                    inline-flex
                    h-full
                    items-center
                    whitespace-nowrap
                    text-[18px]
                    leading-none
                    text-white
                    hover:underline
                  "
                >
                  {news.title}
                </Link>

                {/* Dot */}
                <span
                  className="
                    inline-flex
                    h-full
                    items-center
                    text-[18px]
                    leading-none
                    text-[#ff7777]
                  "
                >
                  •
                </span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marqrue;

