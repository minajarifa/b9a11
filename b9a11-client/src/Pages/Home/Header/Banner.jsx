import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';

export default function Banner() {
    return (
        <div className='container px-6 py-10 mx-auto'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide >
                    <div className='h-[500px]'>
                        <Slider image={'https://i.ibb.co/MGPTPs4/img1.jpg'} text={'Parents want to make sure they’re getting the best tutor possible for their child. The more positive online reviews you have, the higher you rank in search results and increase your chances of being seen by more parents and potential students.'} />
                    </div>
                </SwiperSlide>


                <SwiperSlide >
                    <div className='h-[500px]'>
                        <Slider image={'https://i.ibb.co/NKL3yT6/bg3.jpg'} text={'It’s about creating connections between customers and businesses that leave everyone better off. Along the way, we’re continually crafting a culture where people love to work, and are committed to supporting community development in our hometown of Chattanooga, TN.'} />
                    </div>
                </SwiperSlide>


                <SwiperSlide >
                    <div className='h-[500px]'>
                        <Slider image={'https://i.ibb.co/gFTRmpG/bg2.jpg'} text={'Boutique Education is to provide exceptional, bespoke educational experiences that cater to the unique needs and aspirations of each student. We are committed to instilling a love of learning through our diverse range of services including personalised tuition.'} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

















