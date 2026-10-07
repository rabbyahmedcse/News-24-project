import NewsCard from "@/component/NewsCard";
import Image from "next/image";
import { notFound } from "next/navigation";

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

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const realdata: News[] = data.data;
  if(!realdata){
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-6">

      {/* Category Title */}
      <div className="mb-5">
        <h1 className="border-b-2 border-red-600 pb-3 text-[28px] font-bold text-[#222]">
          {data.title}
        </h1>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {
          realdata.map((news)=> <NewsCard key={news.id} news={news}></NewsCard>)
        }
      </div>
      
    </div>
  );
};

export default CategoryNews;