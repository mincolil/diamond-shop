import { useEffect } from 'react';
import './LandingPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'antd'
import '../../components/Header/styles.css';
import Banner from '../../image/banner2.jpg'
import SmallBanner from '../../image/smallBanner.png'


const { Meta } = Card;

const CardItem = ({ image, title, description }) => {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={image} />}
        >
            <Meta title={title} description={description} />
        </Card>
    );
}


const Home = () => {



    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };

    return (
        <>
            <Header />
            <section className="section" id="section_1" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded">
                </div>
                <div className="section-content relative">
                    <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_1422776750" style={{ width: "100%" }}>
                        <div className="img-inner dark">
                            <img fetchpriority="high" decoding="async" width="1020" height="381" src={Banner} className="attachment-large size-large entered lazyloaded" alt="Banner Home Page" />
                        </div>
                    </div>

                </div>
            </section>
            <section className="section" id="section_2" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded"></div>
                <div className="section-content relative">
                    <div className="row row-small" id="row-152120236">
                        <div id="col-251881028" className="col small-12 large-12">
                            <div className="col-inner">
                                <h2 className="uppercase" style={{ color: '#fff' }}>Danh mục nổi bật</h2>
                            </div>
                        </div>
                        <div id="col-393606776" className="col pb-0 small-12 large-12">
                            <div className="col-inner">


                                <div className="slider-container">
                                    <Slider {...settings}>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Nhẫn Kim Cương Nam
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Nhẫn Kim Cương Nam
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Nhẫn Kim Cương Nam
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Nhẫn Kim Cương Nam
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Nhẫn Kim Cương Nam
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="product-category col is-selected" style={{ position: 'absolute' }}>
                                            <div className="col-inner">
                                                <a aria-label="Visit product category Nhẫn Kim Cương Nam" href="">
                                                    <div className="box box-category has-hover box-normal ">
                                                        <div className="box-image">
                                                            <div className="">
                                                                <img decoding="async" src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" alt="Nhẫn Kim Cương Nam" width="300" height="300" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/nhan-nam.png" data-ll-status="loaded" className="entered lazyloaded" />
                                                            </div>
                                                        </div>
                                                        <div className="box-text text-center">
                                                            <div className="box-text-inner">
                                                                <h5 className="uppercase header-title">
                                                                    Nhẫn Kim Cương Nam
                                                                </h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                    </Slider>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className="section" id="section_3" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded">
                </div>
                <div className="section-content relative">
                    <div className="row row-small align-equal" id="row-1790480698">
                        <div id="col-251220588" className="col small-12 large-12">
                            <div className="col-inner">
                                <h2>Tại sao chọn chúng tôi</h2>
                            </div>
                        </div>
                        <div id="col-716856435" className="col medium-3 small-12 large-3" >
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Sparkling-Diamond-Gold.png" className="attachment-medium size-medium entered lazyloaded" alt="Sparkling Diamond Gold" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Sparkling-Diamond-Gold.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Sparkling-Diamond-Gold.png" className="attachment-medium size-medium" alt="Sparkling Diamond Gold" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">Kim cương giá rẻ</h3>
                                        <p style={{ fontSize: '14px' }}>Cung cấp các mẫu trang sức đẹp sắc sảo, đẳng cấp trong kiểu dáng, tinh tế trong từng chi tiết với giá thành rẻ nhất thị trường hiện tại</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-194442185" className="col medium-3 small-12 large-3">
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Trust.png" className="attachment-medium size-medium entered lazyloaded" alt="Trust" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Trust.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Trust.png" className="attachment-medium size-medium" alt="Trust" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">CHất lượng hoàn mỹ</h3>
                                        <p style={{ fontSize: '14px' }}>Kim cương thiên nhiên nhập khẩu chính ngạch 100% được lựa chọn hết sức cẩn thận, có độ tinh khiết và sáng bóng dù là viên nhỏ nhất</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-2013202466" className="col medium-3 small-12 large-3">
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Clock.png" className="attachment-medium size-medium entered lazyloaded" alt="Clock" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Clock.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Clock.png" className="attachment-medium size-medium" alt="Clock" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">Tận tâm phục vụ</h3>
                                        <p style={{ fontSize: '14px' }}>Đội ngũ nhân viên tận tâm, yêu nghề, giàu chuyên môn, luôn sẵn sàng phục vụ. Đảm bảo làm hài lòng mọi khách hàng khó tính nhất</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="col-178309378" className="col medium-3 small-12 large-3">
                            <div className="col-inner" style={{ backgroundColor: 'rgb(42, 42, 42)', borderRadius: '5px' }}>
                                <div className="icon-box featured-box icon-box-center text-center" style={{ margin: '10px 10px 10px 10px' }}>
                                    <div className="icon-box-img" style={{ width: '90px' }}>
                                        <div className="icon">
                                            <div className="icon-inner">
                                                <img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Gift.png" className="attachment-medium size-medium entered lazyloaded" alt="Gift" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2022/06/Gift.png" data-ll-status="loaded" /><noscript><img decoding="async" width="91" height="90" src="https://caohungdiamond.com/wp-content/uploads/2022/06/Gift.png" className="attachment-medium size-medium" alt="Gift" /></noscript>					</div>
                                        </div>
                                    </div>
                                    <div className="icon-box-text last-reset">

                                        <h3 className="uppercase">Chính sách hấp dẫn</h3>
                                        <p style={{ fontSize: '14px' }}>Bảo hành và làm mới trang sức trọn đời. Nhận thu đổi kim cương với % cực hấp dẫn. Nhận bỏ sỉ kim cương giá tốt toàn Việt Nam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section" id="section_4" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
                <div className="bg section-bg fill bg-fill bg-loaded">
                </div>
                <div className="section-content relative">

                    <div className="row row-small align-equal" id="row-506754410">

                        <div id="col-138763887" className="col small-12 large-12">
                            <div className="col-inner">


                                <div className="img has-hover x md-x lg-x y md-y lg-y" id="image_296087787" style={{ width: '100%' }}>
                                    <div className="img-inner dark">
                                        <img decoding="async" width="1020" height="355" src={SmallBanner} className="attachment-large size-large entered lazyloaded" alt="nhan nu Home Page" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="col-985727245" className="col small-12 large-12">
                            <div className="col-inner">
                                <div id="text-3803404377" className="text" style={{ textAlign: 'center' }}>
                                    <h2 className="uppercase">Nhẫn Nữ</h2>
                                </div>
                            </div>
                        </div>



                        <div id="col-250429594" className="col small-12 large-12">
                            <div className="col-inner">

                                <div className="slider-container">
                                    <Slider {...settings}>

                                        <div className="product-small col has-hover product type-product post-4623 status-publish instock product_cat-nhan-nu product_cat-nhan-kim-cuong product_cat-trang-suc-kim-cuong has-post-thumbnail shipping-taxable purchasable product-type-simple is-selected" style="position: absolute; left: 333.33%;">
                                            <div className="col-inner">
                                                <div className="product-small box ">
                                                    <div className="box-image">
                                                        <div className="image-none">
                                                            <a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" aria-label="Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059">
                                                                <img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail entered lazyloaded" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" data-ll-status="loaded" /><noscript><img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" /></noscript>				</a>
                                                        </div>
                                                        <div className="image-tools is-small top right show-on-hover">
                                                        </div>
                                                        <div className="image-tools is-small hide-for-small bottom left show-on-hover">
                                                        </div>
                                                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover">
                                                        </div>
                                                    </div>

                                                    <div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="title-wrapper"><p className="name product-title woocommerce-loop-product__title"><a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059</a></p></div>		</div>
                                                    <div className="sku text-center">CH 0059</div>		<div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="price-wrapper">
                                                            <span className="price"><span className="woocommerce-Price-amount amount"><bdi>26,500,000&nbsp;<span className="woocommerce-Price-currencySymbol">₫</span></bdi></span></span>
                                                        </div>		</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-small col has-hover product type-product post-4623 status-publish instock product_cat-nhan-nu product_cat-nhan-kim-cuong product_cat-trang-suc-kim-cuong has-post-thumbnail shipping-taxable purchasable product-type-simple is-selected" style="position: absolute; left: 333.33%;">
                                            <div className="col-inner">
                                                <div className="product-small box ">
                                                    <div className="box-image">
                                                        <div className="image-none">
                                                            <a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" aria-label="Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059">
                                                                <img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail entered lazyloaded" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" data-ll-status="loaded" /><noscript><img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" /></noscript>				</a>
                                                        </div>
                                                        <div className="image-tools is-small top right show-on-hover">
                                                        </div>
                                                        <div className="image-tools is-small hide-for-small bottom left show-on-hover">
                                                        </div>
                                                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover">
                                                        </div>
                                                    </div>

                                                    <div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="title-wrapper"><p className="name product-title woocommerce-loop-product__title"><a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059</a></p></div>		</div>
                                                    <div className="sku text-center">CH 0059</div>		<div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="price-wrapper">
                                                            <span className="price"><span className="woocommerce-Price-amount amount"><bdi>26,500,000&nbsp;<span className="woocommerce-Price-currencySymbol">₫</span></bdi></span></span>
                                                        </div>		</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product-small col has-hover product type-product post-4623 status-publish instock product_cat-nhan-nu product_cat-nhan-kim-cuong product_cat-trang-suc-kim-cuong has-post-thumbnail shipping-taxable purchasable product-type-simple is-selected" style="position: absolute; left: 333.33%;">
                                            <div className="col-inner">
                                                <div className="product-small box ">
                                                    <div className="box-image">
                                                        <div className="image-none">
                                                            <a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" aria-label="Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059">
                                                                <img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail entered lazyloaded" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" data-ll-status="loaded" /><noscript><img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" /></noscript>				</a>
                                                        </div>
                                                        <div className="image-tools is-small top right show-on-hover">
                                                        </div>
                                                        <div className="image-tools is-small hide-for-small bottom left show-on-hover">
                                                        </div>
                                                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover">
                                                        </div>
                                                    </div>

                                                    <div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="title-wrapper"><p className="name product-title woocommerce-loop-product__title"><a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059</a></p></div>		</div>
                                                    <div className="sku text-center">CH 0059</div>		<div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="price-wrapper">
                                                            <span className="price"><span className="woocommerce-Price-amount amount"><bdi>26,500,000&nbsp;<span className="woocommerce-Price-currencySymbol">₫</span></bdi></span></span>
                                                        </div>		</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product-small col has-hover product type-product post-4623 status-publish instock product_cat-nhan-nu product_cat-nhan-kim-cuong product_cat-trang-suc-kim-cuong has-post-thumbnail shipping-taxable purchasable product-type-simple is-selected" style="position: absolute; left: 333.33%;">
                                            <div className="col-inner">
                                                <div className="product-small box ">
                                                    <div className="box-image">
                                                        <div className="image-none">
                                                            <a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" aria-label="Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059">
                                                                <img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail entered lazyloaded" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" data-ll-status="loaded" /><noscript><img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" /></noscript>				</a>
                                                        </div>
                                                        <div className="image-tools is-small top right show-on-hover">
                                                        </div>
                                                        <div className="image-tools is-small hide-for-small bottom left show-on-hover">
                                                        </div>
                                                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover">
                                                        </div>
                                                    </div>

                                                    <div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="title-wrapper"><p className="name product-title woocommerce-loop-product__title"><a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059</a></p></div>		</div>
                                                    <div className="sku text-center">CH 0059</div>		<div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="price-wrapper">
                                                            <span className="price"><span className="woocommerce-Price-amount amount"><bdi>26,500,000&nbsp;<span className="woocommerce-Price-currencySymbol">₫</span></bdi></span></span>
                                                        </div>		</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-small col has-hover product type-product post-4623 status-publish instock product_cat-nhan-nu product_cat-nhan-kim-cuong product_cat-trang-suc-kim-cuong has-post-thumbnail shipping-taxable purchasable product-type-simple is-selected" style="position: absolute; left: 333.33%;">
                                            <div className="col-inner">
                                                <div className="product-small box ">
                                                    <div className="box-image">
                                                        <div className="image-none">
                                                            <a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" aria-label="Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059">
                                                                <img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail entered lazyloaded" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" data-ll-status="loaded" /><noscript><img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" /></noscript>				</a>
                                                        </div>
                                                        <div className="image-tools is-small top right show-on-hover">
                                                        </div>
                                                        <div className="image-tools is-small hide-for-small bottom left show-on-hover">
                                                        </div>
                                                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover">
                                                        </div>
                                                    </div>

                                                    <div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="title-wrapper"><p className="name product-title woocommerce-loop-product__title"><a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059</a></p></div>		</div>
                                                    <div className="sku text-center">CH 0059</div>		<div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="price-wrapper">
                                                            <span className="price"><span className="woocommerce-Price-amount amount"><bdi>26,500,000&nbsp;<span className="woocommerce-Price-currencySymbol">₫</span></bdi></span></span>
                                                        </div>		</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-small col has-hover product type-product post-4623 status-publish instock product_cat-nhan-nu product_cat-nhan-kim-cuong product_cat-trang-suc-kim-cuong has-post-thumbnail shipping-taxable purchasable product-type-simple is-selected" style="position: absolute; left: 333.33%;">
                                            <div className="col-inner">
                                                <div className="product-small box ">
                                                    <div className="box-image">
                                                        <div className="image-none">
                                                            <a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" aria-label="Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059">
                                                                <img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail entered lazyloaded" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" data-lazy-src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" data-ll-status="loaded" /><noscript><img decoding="async" width="247" height="296" src="https://caohungdiamond.com/wp-content/uploads/2021/03/7-2-247x296.png" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="Nhẫn kim cương nữ vàng trắng 18K CH 0059" /></noscript>				</a>
                                                        </div>
                                                        <div className="image-tools is-small top right show-on-hover">
                                                        </div>
                                                        <div className="image-tools is-small hide-for-small bottom left show-on-hover">
                                                        </div>
                                                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover">
                                                        </div>
                                                    </div>

                                                    <div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="title-wrapper"><p className="name product-title woocommerce-loop-product__title"><a href="https://caohungdiamond.com/san-pham/nhan-kim-cuong-nu-cao-hung-ch-0059/" className="woocommerce-LoopProduct-link woocommerce-loop-product__link">Mẫu nhẫn nữ kim cương sang trọng vàng trắng 18K CH 0059</a></p></div>		</div>
                                                    <div className="sku text-center">CH 0059</div>		<div className="box-text box-text-products text-center grid-style-2">
                                                        <div className="price-wrapper">
                                                            <span className="price"><span className="woocommerce-Price-amount amount"><bdi>26,500,000&nbsp;<span className="woocommerce-Price-currencySymbol">₫</span></bdi></span></span>
                                                        </div>		</div>
                                                </div>
                                            </div>
                                        </div>


                                    </Slider>
                                </div>


                            </div>
                        </div>



                        <div id="col-1533316930" className="col pb-0 small-12 large-12">
                            <div className="col-inner text-center">
                                <a href="" className="button primary lowercase home-button" style={{ borderRadius: '5px' }}>
                                    <span>Xem thêm</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
            <Footer />
        </>
    );
}

export default Home;

