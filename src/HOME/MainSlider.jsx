
import mainslider from '../../src/assets/image/img1-slider.jpg'
import slide1 from '../../src/assets/image/img1-main-slider_.jpg'
import slide2 from '../../src/assets/image/img2-main-slider.jpg'
import slide3 from '../../src/assets/image/img2-slider.jpg'
import slide4 from '../../src/assets/image/img3-slider.jpg'
import Slider from "react-slick";


export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

  return (
    <>
    <div className="row justify-center">
        <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
            <Slider {...settings}>
            <img className='w-full' src={mainslider} alt="" />
            <img className='w-full' src={slide3} alt="" />
            <img className='w-full' src={slide4} alt="" />
            </Slider>
        </div>
  <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
    <img src={slide1} className='w-full' alt="" />
    <img src={slide2} className='w-full' alt="" />
  </div>
</div>

    </>
  )
}
