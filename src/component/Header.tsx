import Link from 'next/link';
import React from 'react';
import HeaderLink from './HeaderLink';
import UserInfo from './UserInfo';

const Header = () => {
    const date = new Date().toLocaleDateString(
        "bn-BD", {
            dateStyle:'full'
        }
    )
    return (
        <div className='container mx-auto'>
              <header className="w-full border-t-2 ] bg-white">

{/* Top Header */}
<div className="relative mx-auto flex h-[112px] w-full items-center justify-center">

  {/* Logo + Brand */}
  <Link
    href="/"
    className="flex items-center gap-[13px]"
  >
    {/* Logo */}
    <div
      className="
        flex h-[60px] w-[60px]
        items-center justify-center
        overflow-hidden rounded-[16px]
        bg-gradient-to-br from-[#111827] to-[#182033]
      "
    >
      <span
        className="
          font-sans text-[45px] font-black
          italic leading-none text-[#ff3218]
        "
      >
        B
      </span>
    </div>

    {/* Brand Text */}
    <div>
      <h1
        className="
          font-serif text-[36px] font-bold
          leading-[40px] text-[#b40000]
        "
      >
        Bangla News 24
      </h1>

      <p
        className="
          mt-[2px]
          font-serif text-[14px]
          leading-[20px] text-[#999]
        "
      >
        {date}
      </p>
    </div>
  </Link>


  {/* Login / Signup */}
  <UserInfo></UserInfo>
</div>


{/* Navigation */}
<nav
  className="
    flex h-[43px]
    items-center justify-center
    
    border-b border-[#ddd]
  "
>
  <HeaderLink/>
</nav>

</header>
        </div>
    );
};

export default Header;