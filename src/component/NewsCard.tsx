import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface News {
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
const NewsCard = ({news}:{news:News}) => {
    return (
       <Link href={`/news/${news.id}`}>
        <div>
              <article
                    key={news.id}
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                    "
                  >

                    {/* Image */}
                    {/* <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    > */}
                      <div className="h-[175px] w-full overflow-hidden bg-gray-100">

                        <Image
                          src={news.imageUrl}
                          alt={news.imageAlt}
                          width={800}
                          height={800}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-300
                            hover:scale-105
                          "
                        />

                      </div>
                    {/* </a> */}

                    {/* Content */}
                    <div className="p-3">

                      {/* Category */}
                      <p className="mb-2 text-[14px] font-medium text-[#d00000]">
                        {news.category}
                      </p>

                      {/* Title */}
                      {/* <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      > */}
                        <h3
                          className="
                            line-clamp-3
                            text-[19px]
                            font-semibold
                            leading-[1.4]
                            text-[#222]
                            hover:text-[#d00000]
                          "
                        >
                          {news.title}
                        </h3>
                      {/* </a> */}

                      {/* Description */}
                      <p
                        className="
                          mt-2
                          line-clamp-2
                          text-[14px]
                          leading-[1.6]
                          text-gray-500
                        "
                      >
                        {news.description}
                      </p>

                      {/* Date */}
                      <p className="mt-3 text-[12px] text-gray-400">
                        {news.firstPublished
                          ? new Date(
                              news.firstPublished
                            ).toLocaleDateString("bn-BD")
                          : ""}
                      </p>

                    </div>
                  </article>
        </div>
       </Link>
    );
};

export default NewsCard;