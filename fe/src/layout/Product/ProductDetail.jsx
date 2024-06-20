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
    const [tab, setTab] = useState(0);
    const [product, setProduct] = useState(null);
    const [goldTypeList, setGoldTypeList] = useState(null);
    const [goldNameList, setGoldNameList] = useState(null);
    const [goldPriceID, setGoldPriceID] = useState(null);
    const [diamoidTypeList, setDiamoidTypeList] = useState(null);
    const [smallDiamoidTypeList, setSmallDiamoidTypeList] = useState(null);
    const [goldType, setGoldType] = useState(null);
    const [diamoidType, setDiamoidType] = useState(null);
    const [smallDiamoidType, setSmallDiamoidType] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [NiSize, setNiSize] = useState(null);

    //----------------------UseEffect----------------------
    useEffect(() => {
        loadProductDetail();
        loadMeterial();
        loadGoldName();
    }, []);


    useEffect(() => {
        if (goldTypeList && goldTypeList.length > 0 && goldType === null) {
            setGoldType(goldTypeList[0].GoldTypeID);
        }
        if (diamoidTypeList && diamoidTypeList.length > 0 && diamoidType === null) {
            setDiamoidType(diamoidTypeList[0].DiaPriceID);
        }
        if (smallDiamoidTypeList && smallDiamoidTypeList.length > 0 && smallDiamoidType === null) {
            setSmallDiamoidType(smallDiamoidTypeList[0].DiaSmallPriceID);
        }

    }, [goldTypeList, goldType, diamoidTypeList, diamoidType, smallDiamoidTypeList, smallDiamoidType]);

    //useEffect set total price
    useEffect(() => {
        if (product && goldType && diamoidType && smallDiamoidType) {
            const goldTypePrice = goldTypeList.find((item) => item.GoldTypeID === goldType).GoldPrice;
            const goldPrice = goldTypeList.find((item) => item.GoldTypeID === goldType).GoldPriceID;
            setGoldPriceID(goldPrice);
            const goldWeight = goldTypeList.find((item) => item.GoldTypeID === goldType).GoldWeight;
            const diamoidTypePrice = diamoidTypeList.find((item) => item.DiaPriceID === diamoidType).DiaPrice;
            const diamoidWeight = diamoidTypeList.find((item) => item.DiaPriceID === diamoidType).DiaWeight;
            const smallDiamoidTypePrice = smallDiamoidTypeList.find((item) => item.DiaSmallPriceID === smallDiamoidType).DiaSmallPrice;

            //convert wagePrice, goldTypePrice, diamoidTypePrice, smallDiamoidTypePrice to number
            const wagePrice = parseFloat(product.WagePrice);
            const goldTypePriceNumber = parseFloat(goldTypePrice) * goldWeight;
            const diamoidTypePriceNumber = parseFloat(diamoidTypePrice) * diamoidWeight;
            const smallDiamoidTypePriceNumber = parseFloat(smallDiamoidTypePrice) * product.DiaSmallQuantity;
            const totalPrice = wagePrice + goldTypePriceNumber + diamoidTypePriceNumber + smallDiamoidTypePriceNumber;
            //convert totalPrice to number
            setTotalPrice(totalPrice);
        }
    }, [product, goldType, diamoidType, smallDiamoidType, goldTypeList, diamoidTypeList, smallDiamoidTypeList]);



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

    const loadMeterial = async () => {
        try {
            const responseGoldType = await axios.get(`/gold_price`);
            if (responseGoldType.error) {
                console.log("Error load goldTypeList");
            } else {
                console.log("responseGoldType", responseGoldType.data);
                setGoldTypeList(responseGoldType.data);
            }
            const responseDiamoidType = await axios.get(`/dia_price`);
            if (responseDiamoidType.error) {
                console.log("Error load diamoidTypeList");
            } else {
                setDiamoidTypeList(responseDiamoidType.data);
            }
            const responseSmallDiamoidType = await axios.get(`/dia_small_price`);
            if (responseSmallDiamoidType.error) {
                console.log("Error load smallDiamoidTypeList");
            } else {
                setSmallDiamoidTypeList(responseSmallDiamoidType.data);
            }
        } catch {
            console.log("Error");
        }
    }

    const loadGoldName = async () => {
        try {
            const responseGoldName = await axios.get(`/gold_type`);
            if (responseGoldName.error) {
                console.log("Error load goldNameList");
            } else {
                setGoldNameList(responseGoldName.data);
            }
        } catch {
            console.log("Error");
        }
    }

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
    const handleAddToCart = () => {
        if (localStorage.getItem('token') === null) {
            openNotificationWithIcon('error', 'Vui lòng đăng nhập để tiếp tục');
        } else if (localStorage.getItem('role') !== 'Customer') {
            openNotificationWithIcon('error', 'Bạn không có quyền thực hiện chức năng này');
        } else {
            const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            const productInCart = {
                ProductID: product.ProductID,
                WagePrice: product.WagePrice,
                GoldTypeID: goldType,
                GoldPriceID: goldPriceID,
                DiaPriceID: diamoidType,
                DiaSmallPriceID: smallDiamoidType,
                Quantity: quantity,
                TotalPrice: totalPrice
            }
            //check if product in cart has same productID, goldTypeID, DiaPriceID, DiaSmallPriceID => increase quantity
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].ProductID === product.ProductID && cart[i].GoldTypeID === goldType && cart[i].DiaPriceID === diamoidType && cart[i].DiaSmallPriceID === smallDiamoidType) {
                    cart[i].Quantity += quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert("Thêm vào giỏ hàng thành công");
                    return;
                }
            }
            cart.push(productInCart);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert("Thêm vào giỏ hàng thành công");
        }

    }

    const handleChangeTab = (event, newTab) => {
        setTab(newTab);
    };

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
                                    src="https://via.placeholder.com/600x600"
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
                                    {/* <Grid item xs={6}>
                                        <select value={goldType} onChange={(e) => setGoldType(e.target.value)}>
                                            {goldNameList && goldNameList.map((item) => (
                                                <option key={item.GoldTypeID} value={item.GoldTypeID}>{item.GoldTypeName}</option>
                                            ))}
                                        </select>
                                    </Grid> */}
                                    <Grid item="true" xs={2}>
                                        <p><strong>{product && product.GoldID}</strong></p>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p><strong>Viên chính:</strong></p>
                                    </Grid>
                                    {/* <Grid item xs={6}>
                                        <select value={diamoidType} onChange={(e) => setDiamoidType(e.target.value)}>
                                            {diamoidTypeList && diamoidTypeList.map((item) => (
                                                <option key={item.DiaPriceID} value={item.DiaPriceID}>{item.DiaPriceID}</option>
                                            ))}
                                        </select>
                                    </Grid> */}
                                    <Grid item="true" xs={2}>
                                        <p><strong>{product && product.DiamondID}</strong></p>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item="true" xs={6}>
                                        <p><strong>Viên phụ:</strong></p>
                                    </Grid>
                                    {/* <Grid item xs={6}>
                                        <select value={smallDiamoidType} onChange={(e) => setSmallDiamoidType(e.target.value)}>
                                            {smallDiamoidTypeList && smallDiamoidTypeList.map((item) => (
                                                <option key={item.DiaSmallPriceID} value={item.DiaSmallPriceID}>{item.DiaSmallPriceID}</option>
                                            ))}
                                        </select>
                                    </Grid> */}
                                    <Grid item="true" xs={2}>
                                        <p><strong>{product && product.DiamondSmallID}</strong></p>
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
                                    onClick={() => handleAddToCart()}
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
