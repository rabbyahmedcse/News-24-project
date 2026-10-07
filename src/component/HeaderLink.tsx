import Link from 'next/link';
import React from 'react';
interface Navs{
    slug:string,
    title:string,
    topicId: string | null
    url:string,
    scrapable: boolean


}
const HeaderLink = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories')
    const data = await res.json()
    const navs:Navs[] = data.data;
    const filterNavs = navs.filter((n) =>n.scrapable)
    return (
        <div className="text-black flex gap-4" >
            <Link href={'/'}>হোম</Link>
            {
                filterNavs.map((n,i)=><Link key={i} href={`/Category/${n.slug}`}> {n.title}</Link>)
            }
        </div>
    );
};

export default HeaderLink;



