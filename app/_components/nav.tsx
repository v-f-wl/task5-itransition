'use client'
import { useEffect, useState } from "react";
import DiscreteSlider from "./ui/discrete-slider";
import SelectLanguage from "./ui/select-input";
import SeedInput from "./ui/seed-input";
import ReviewsInput from "./ui/reviews-input";
import GridType from "./ui/grid-type";


const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return ( 
    <nav 
      className={`
        ${isScrolled ? 'top-0' : 'top-4'}
        fixed left-1/2 -translate-x-1/2 py-2  z-100
        px-8 transition-all
        bg-white container shadow-sm rounded-md
        flex justify-center gap-[100px] items-center
      `}
    >
      <SelectLanguage/>
      <SeedInput/>
      <DiscreteSlider/>
      <ReviewsInput/>
      <GridType/>
    </nav>
  );
}
 
export default Nav;