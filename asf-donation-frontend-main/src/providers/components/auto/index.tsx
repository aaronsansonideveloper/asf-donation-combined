import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useFlatInject } from 'src/service';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import DealCard from '../deal-card';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function MenuCarousel() {
  const { userDealList } = useFlatInject('dealStore');

  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {userDealList.length < 3 && (
          <Grid2 container>
            {userDealList.map((item) => {
              return (
                <Grid2 xs={4}>
                  <Box
                    sx={{
                      padding: '8px',
                    }}
                    key={item.id}
                  >
                    <DealCard deal={item}></DealCard>
                  </Box>
                </Grid2>
              );
            })}
          </Grid2>
        )}
      </Box>
      {userDealList.length > 3 && (
        <Swiper
          onClick={() => {}}
          speed={1000}
          style={{
            width: '100%',
            height: '100%',
          }}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
            // waitForTransition: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {userDealList.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <DealCard deal={item}></DealCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}
