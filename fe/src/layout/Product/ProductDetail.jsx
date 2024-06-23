import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
    Container,
    Typography,
    Link,
    Button,
    Box,
    Breadcrumbs,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import Grid from "@mui/material/Unstable_Grid2";
import './css/productDetail.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { notification } from 'antd';


const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};


let theme = createTheme();
theme = responsiveFontSizes(theme);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [NiSize, setNiSize] = useState(null);
    const [gold, setGold] = useState(null);
    const [diamond, setDiamond] = useState(null);
    const [diamondSmall, setDiamondSmall] = useState(null);
    const [goldType, setGoldType] = useState(null);



    //----------------------Handle Function----------------------
    const loadProductDetail = async () => {
        try {
            const response = await axios.get(`/product/${productId}`);
            if (response.error) {
                console.log("Error");
            } else {
                setProduct(response.data);
            }
        } catch {
            console.log("Error loadProductDetail");
        }
    }

    //load gold
    const loadGold = async () => {
        try {
            const goldList = await axios.get(
                `/gold_price`
            );
            if (goldList) {
                const gold = goldList.data.find((item) => item.GoldPriceID === product.GoldID);
                setGold(gold);
            }
        } catch (error) {
            console.error("Failed to fetch gold data: ", error);
        }
    };

    //load diamond
    const loadDiamond = async () => {
        try {
            const diamondList = await axios.get(
                `/dia_price`
            );
            if (diamondList) {
                //search diamond that has same diamondID with product
                const diamond = diamondList.data.find((item) => item.DiaPriceID === product.DiamondID);
                setDiamond(diamond);
            }
        } catch (error) {
            console.error("Failed to fetch diamond data: ", error);
        }
    };

    //load diamondSmall
    const loadDiamondSmall = async () => {
        try {
            const diamondSmallList = await axios.get(
                `/dia_small_price`
            );
            if (diamondSmallList) {
                //search diamondSmall that has same diamondSmallID with product
                const diamondSmall = diamondSmallList.data.find((item) => item.DiaSmallPriceID === product.DiamondSmallID);
                setDiamondSmall(diamondSmall);
            }
        } catch (error) {
            console.error("Failed to fetch diamondSmall data: ", error);
        }
    };

    const loadGoldType = async () => {
        try {
            const goldTypeList = await axios.get(
                `/gold_type`
            );
            if (goldTypeList) {
                //search goldType that has same goldTypeID with gold
                const goldType = goldTypeList.data.find((item) => item.GoldTypeID === gold.GoldTypeID);
                setGoldType(goldType);
            }
        } catch (error) {
            console.error("Failed to fetch goldType data: ", error);
        }
    };



    //handle total price
    useEffect(() => {
        if (product && gold && diamond && diamondSmall) {
            const goldPrice = gold.GoldPrice * gold.GoldWeight;
            const diamondPrice = diamond.DiaPrice * diamond.DiaWeight;
            const diamondSmallPrice = diamondSmall.DiaSmallPrice * diamondSmall.DiaSmallWeight;
            const total = goldPrice + diamondPrice + diamondSmallPrice + parseFloat(product.WagePrice);
            setTotalPrice(total);
        }
    }
        , [product, gold, diamond, diamondSmall]);


    //use effect
    useEffect(() => {
        loadProductDetail();
    }, [productId]);

    useEffect(() => {
        if (product) {
            loadGold();
            loadDiamond();
            loadDiamondSmall();
        }
    }, [product]);

    useEffect(() => {
        if (gold) {
            loadGoldType();
        }
    }, [gold]);



    //----------------------Hanlde quantity----------------------
    const handleQuantity = (type) => {
        if (type === "increase") {
            setQuantity(quantity + 1);
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        }
    }
    //handle total price



    //----------------------Handel add to cart----------------------
    // const handleAddToCart = () => {
    //     if (localStorage.getItem('token') === null) {
    //         openNotificationWithIcon('error', 'Vui lòng đăng nhập để tiếp tục');
    //     } else if (localStorage.getItem('role') !== 'Customer') {
    //         openNotificationWithIcon('error', 'Bạn không có quyền thực hiện chức năng này');
    //     } else {
    //         const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    //         const productInCart = {
    //             ProductID: product.ProductID,
    //             WagePrice: product.WagePrice,
    //             GoldTypeID: goldType,
    //             GoldPriceID: goldPriceID,
    //             DiaPriceID: diamoidType,
    //             DiaSmallPriceID: smallDiamoidType,
    //             Quantity: quantity,
    //             TotalPrice: totalPrice,
    //             ProTypeID: product.ProTypeID,
    //         }
    //         //check if product in cart has same productID, goldTypeID, DiaPriceID, DiaSmallPriceID => increase quantity
    //         for (let i = 0; i < cart.length; i++) {
    //             if (cart[i].ProductID === product.ProductID && cart[i].GoldTypeID === goldType && cart[i].DiaPriceID === diamoidType && cart[i].DiaSmallPriceID === smallDiamoidType) {
    //                 cart[i].Quantity += quantity;
    //                 localStorage.setItem('cart', JSON.stringify(cart));
    //                 alert("Thêm vào giỏ hàng thành công");
    //                 return;
    //             }
    //         }
    //         cart.push(productInCart);
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         alert("Thêm vào giỏ hàng thành công");
    //     }

    // }

    //-----------------ant notyfication--------------------
    //notify
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

    return (
        <div >
            <Header />
            {contextHolder}
            <Container className="container-product"
                sx={{ position: "relative", top: "20px", marginBottom: "150px" }}
            >
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<KeyboardDoubleArrowRightIcon fontSize="small" />}
                    sx={{ color: "#ffffff" }}
                >
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="inherit"
                        href="/"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="inherit"
                        href="/product"
                    >
                        Sản phẩm
                    </Link>
                    <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        {product && product.ProductID}
                    </Typography>
                </Breadcrumbs>


                <Box className="">
                    <Typography theme={theme} variant="h3" className="product_title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        {product ? product.ProTypeID + " " + product.GoldID : "Product name"}
                    </Typography>
                    <Grid container>
                        <Grid item="true" xl={5} lg={5}>
                            <Box>
                                <img
                                    className="img_zoom"
                                    src="https://caohungdiamond.com/wp-content/uploads/2023/11/vt0159-3-510x510.jpg"
                                    alt="img"
                                    style={{ width: "-webkit-fill-available" }}
                                />
                            </Box>
                        </Grid>
                        <Grid item="true" xl={7} lg={7} className="details-infor">
                            <Typography variant="h1" className="product-title">
                                Price: {product && numberToVND(totalPrice)}
                            </Typography>
                            <div className="product-infor" style={{ paddingTop: '20px' }}>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p><strong>Chất liệu:</strong></p>
                                    </Grid>
                                    <Grid item="true" xs={3}>
                                        {goldType && (
                                            <p><strong>{goldType.GoldTypeName}</strong></p>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p><strong>Viên chính:</strong></p>
                                    </Grid>
                                    <Grid item="true" xs={3}>
                                        <p><strong>{diamond && diamond.DiaWeight} ly</strong></p>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p><strong>Viên phụ:</strong></p>
                                    </Grid>
                                    <Grid item="true" xs={3}>
                                        <p><strong>{diamondSmall && diamondSmall.DiaSmallWeight} ly</strong></p>
                                    </Grid>
                                </Grid>
                                <p>
                                    <strong>Mã sản phẩm: {product && product.ProductID} </strong>
                                </p>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p><strong>Chọn Ni:</strong></p>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <select value={NiSize} onChange={(e) => setNiSize(e.target.value)} >
                                            <option>14.7mm</option>
                                            <option>15.0mm</option>
                                            <option>15.5mm</option>
                                            <option>16.0mm</option>
                                            <option>16.5mm</option>
                                        </select>
                                    </Grid>

                                </Grid>
                                <a href="/niSize" ><p>
                                    <strong>Hướng dẫn chọn Ni(size) </strong>
                                </p></a>

                            </div>
                            <Box className="quantity-add-to-cart">
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p>Chọn số lượng:</p>
                                    </Grid>
                                    <Grid item="true" xs={2}>
                                        <Button
                                            onClick={() => handleQuantity("decrease")}
                                        >-</Button>
                                    </Grid>
                                    <Grid item="true" xs={2}>
                                        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                                    </Grid>
                                    <Grid item="true" xs={2}>
                                        <Button
                                            onClick={() => handleQuantity("increase")}
                                        >+</Button>
                                    </Grid>
                                </Grid>

                                <Button
                                    className="single_add_to_cart_button"
                                    variant="contained"
                                    color="primary"
                                // onClick={() => handleAddToCart()}
                                >
                                    Thêm vào giỏ hàng
                                </Button>

                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* <Box className="tab-details-product">
                    <Tabs
                        value={tab}
                        onChange={(e) =>handleChangeTab}
                        aria-label="product tabs"
                        sx={{
                            "& .MuiTabs-root": {
                                color: "#ffffff",
                            },
                            "& .MuiTabs-flexContainer": {
                                justifyContent: "center",
                            },
                            "& .MuiTab-root": {

                                color: "rgba(255, 255, 255, 0.7)",
                            },
                            "& .Mui-selected": {

                                color: "#e8be6f",
                            },
                        }}
                    >
                        <Tab label="Chi tiết sản phẩm" />
                        <Tab label="Đánh giá sản phẩm" />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <Typography paragraph>mo ta san pham</Typography>
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                    </TabPanel>
                </Box> */}
            </Container>

            <Footer />
        </div>
    );
}

export default ProductDetail;
