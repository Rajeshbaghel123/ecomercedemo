import React from 'react';
import HeroSection from "../../components/HeroSection/HeroSection";
import SectionContent from "../../components/SectionContent/SectionContent";
import MobileSection from "../../components/MobileSection/MobileSection"
import CardSection from "../../components/CardSection/CardSection";
import WhyChooseUs from '../../components/WhyChoseUs/WhyChooseUs';
import OurProducts from '../../components/OurProducts/OurProducts';
import GifSection from '../../components/GifSection/GifSection';

const Home = () => {
  return (
    <>
     <HeroSection/>
     <SectionContent/>
     <MobileSection/>
     <WhyChooseUs/>
     <CardSection/>
     <OurProducts/>
     <GifSection/>

    </>
  );
};

export default Home;