import MainNews from "@/component/MainNews";
import Marqrue from "@/component/Marqrue";
import MostRead from "@/component/MostRead";
import NewsCard from "@/component/NewsCard";
import Image from "next/image";

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

interface OtherSection {
  curationId: string;
  title: string;
  articles: News[];
}

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  const data = await res.json();

  const section: OtherSection[] = data.data;

  // First section
  const mainNews = section[0].articles;

  // Other sections
  const otherSection = section.slice(1);

  return (
    <div>
 

      <div className="container mx-auto mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ================= LEFT - 2 COLUMNS ================= */}
        <div className="lg:col-span-2">

          {/* Main News */}
          <MainNews news={mainNews} />

          {/* Other Sections */}
          {otherSection.map((section) => (
            <section
              key={section.curationId}
              className="mt-8"
            >

              {/* Section Title */}
              <div className="mb-4">
                <h2
                  className="
                    border-b-2
                    border-red-600
                    pb-2
                    text-[24px]
                    font-bold
                    text-[#222]
                  "
                >
                  {section.title}
                </h2>
              </div>

              {/* News Cards */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                {section.articles.map((news) => (
                  <NewsCard key={news.id} news={news}></NewsCard>
                ))}

              </div>
            </section>
          ))}

        </div>


        {/* ================= RIGHT - 1 COLUMN ================= */}
        <div className="lg:col-span-1">

          {/* এখানে পরে sidebar content দিতে পারো */}
          <div className="rounded-xl border border-gray-200 p-5">
           <MostRead></MostRead>
          </div>

        </div>

      </div>
    </div>
  );
}