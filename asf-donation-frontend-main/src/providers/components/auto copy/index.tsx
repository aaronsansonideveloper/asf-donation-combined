import Box from '@mui/material/Box';
import { Carousel, useCarousel } from 'src/muiEazy';
import { useFlatInject } from 'src/service';
import DealCard from '../deal-card';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// ----------------------------------------------------------------------

export default function MenuCarousel() {
  const { userDealList } = useFlatInject('dealStore');
  const carousel = useCarousel({
    infinite: true,
    slidesToShow: userDealList.length > 3 ? 3 : userDealList.length,
    cssEase: 'linear',
    swipeToSlide: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnDotsHover: true,
  });

  return (
    <Box sx={{ position: 'relative', width: '100%', flex: 1 }}>
      {userDealList.length >= 3 && (
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {userDealList.map((item) => {
            return (
              <Box
                sx={{
                  padding: '8px',
                }}
                key={item.id}
              >
                <DealCard deal={item}></DealCard>
              </Box>
            );
          })}
        </Carousel>
      )}
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
  );
}
