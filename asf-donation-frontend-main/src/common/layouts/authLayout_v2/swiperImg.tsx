// Import Swiper React components
import { alpha, useTheme } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import Image from 'src/components/image';
import { useResponsive } from 'src/muiEazy';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
const config = [
  {
    img: '/assets/pic-1.jpeg',
  },
  {
    img: '/assets/pic-2.jpeg',
  },
];
export default function SwiperImg() {
  const isMobile = useResponsive('down', 'md');
  const theme = useTheme();
  return (
    <Swiper
      loop
      style={{
        height: isMobile ? '20vh' : '100%',
        marginBottom: isMobile ? '32px' : '0px',
        //@ts-ignore
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
        '--swiper-navigation-size': '24px',
      }}
      spaceBetween={30}
      centeredSlides={true}
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
      {config.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Image
              key={item.img}
              alt={item.img}
              src={item.img}
              overlay={`linear-gradient(to bottom, ${alpha(
                theme.palette.common.black,
                0
              )} 0%, ${alpha(theme.palette.common.black, 0.8)} 100%)`}
              sx={{
                '& img': { minHeight: '100%', width: 1 },
                position: 'absolute',
                left: 0,
                top: 0,
                width: '1',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
