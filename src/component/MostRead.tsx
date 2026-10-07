import Link from 'next/link';
import React from 'react';

const MostRead = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read');
    const data = await res.json();
    const mostReadNews = data.data;
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        {/* Heading */}
        <div className="px-5 pt-5">
          <h2 className="inline-block bg-[#d3d3d3] px-1 py-0.5 text-[22px] font-bold text-[#222]">
            সর্বাধিক পঠিত
          </h2>
        </div>
  
        {/* News List */}
        <div className="px-5 pb-5 pt-2">
  
          {mostReadNews.map((news) => (
            <Link  key={news.id}
            href={`/news/${news.id}`}
            target="_blank"
            rel="noopener noreferrer">
            <div
             
              className="flex gap-4 py-3"
            >
  
              {/* Number */}
              <span className="shrink-0 text-[25px] font-normal leading-[1.3] text-[#e33434]">
                {news.rank}
              </span>
  
              {/* Title */}
              <h3 className="text-[18px] font-medium leading-[1.45] text-[#171717] transition hover:text-[#c90000]">
                {news.title}
              </h3>
  
            </div>
            </Link>
          ))}
  
        </div>
      </div>
    );
};

export default MostRead;