import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
    Breadcrumbs,
    Link,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import '../../components/Header/styles.css'
import axios from "axios";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { notification } from 'antd';
import { Co2Sharp } from "@mui/icons-material";


const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

export default function Checkout() {
    const context = useAuth();
    const navigate = useNavigate();

    const { auth } = context;


    const [total, setTotal] = useState(0);
    const [totalDetail, setTotalDetail] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [cartList, setCartList] = useState([]);
    const [promp, setPromp] = useState(0);
    const [order, setOrder] = useState({
        CusName: "",
        CusPhone: "",
        CusAddress: "",
        SaleDate: new Date(),
        CusSize: 5,
        Currency: "VND",
        ShipPrice: "50000.00",
        PayBeforePrice: "50000.00",
        EmployeeIDShip: "EMP001",
        OrdStatus: true,
    });
    const [payBefore, setPayBefore] = useState(50000);
    const [BonusPointList, setBonusPointList] = useState([]);
    const [BonusPointId, setBonusPointId] = useState("");
    const [OrderPoint, setOrderPoint] = useState(0);
    const [OrderId, setOrderId] = useState("");

    //ant noti
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };



    //---------------------- useEffect ----------------------
    useEffect(() => {
        loadCart();
        loadPromotion();
        loadBonusPoint();
        loadOrderId();
    }, []);

    useEffect(() => {
        totalCart();
    }, [cartList, promp]);

    useEffect(() => {
        loadBonusPointId();
    }, [totalDetail, BonusPointList]);

    // useEffect(() => {
    //     console.log(order);
    // }, [order]);

    //---------------------- LOAD DATA ----------------------
    // load cart from local storage
    const loadCart = async () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) {
            cart = [];
        }
        setCartList(cart);
    };

    const loadPromotion = async () => {
        try {
            const response = await axios.get('/promotion');
            if (response.status === 200) {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (dayjs().isBetween(dayjs(data[i].PromStartDate), dayjs(data[i].PromEndDate)) && data[i].PromPercent > promp) {
                        {
                            setPromp(data[i].PromPercent);
                            console.log(data[i].PromPercent);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const totalCart = () => {
        let total = 0;
        let totalDetail = 0;
        cartList.forEach((product) => {
            total += product.TotalPrice * product.Quantity;
        });
        setTotalDetail(total);
        totalDetail = total;

        // Check promotion
        let discountPricePara = 0;
        if (promp) {
            discountPricePara = total * promp / 100;
            total -= discountPricePara;
        }
        // Update states
        setDiscountPrice(discountPricePara);
        setTotal(total);
    };


    const loadOrderId = async () => {
        // get last order id
        try {
            const response = await axios.get('/order');
            if (response.status === 200) {
                const data = response.data;
                let orderId = data[data.length - 1].OrderID;
                orderId = orderId.slice(3);
                orderId = parseInt(orderId) + 1;
                if (orderId < 10) orderId = "ORD" + "00" + orderId;
                else if (orderId < 100) orderId = "ORD" + "0" + orderId;
                else orderId = "ORD" + "00" + orderId;
                setOrderId(orderId);
            }
        } catch (error) {
            console.error(error);
        }
    };



    const loadBonusPoint = async () => {
        try {
            const response = await axios.get('/bonus_point');
            if (response.status === 200) {
                const data = response.data;
                setBonusPointList(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const loadBonusPointId = async () => {
        //find max of MaxPrice in BonusPointList\
        //truong hop total > maxPrice
        let maxPrice = 0;
        BonusPointList.map((bonusPoint) => {
            if (parseFloat(bonusPoint.MaxPrice) > maxPrice) {
                maxPrice = parseFloat(bonusPoint.MaxPrice);
            }
        });
        if (totalDetail > maxPrice) {
            setOrderPoint(30);
            setOrder({ ...order, OrderPoint: 30 });
            return;
        }

        //check totalDetail in range of bonuspoint.MinPrice and bonuspoint.MaxPrice
        let bonusPoint = BonusPointList.find((bonusPoint) => {
            const minPrice = parseFloat(bonusPoint.MinPrice);
            const maxPrice = parseFloat(bonusPoint.MaxPrice);
            return totalDetail >= minPrice && totalDetail <= maxPrice;
        });
        if (bonusPoint !== undefined) {
            setBonusPointId(bonusPoint.BonusPointID);
            setOrderPoint(bonusPoint.Point);
            setOrder({ ...order, OrderPoint: bonusPoint.Point });
        } else {
            setBonusPointId("");
            setOrderPoint(0);
            setOrder({ ...order, OrderPoint: 0 });
        }
    };



    //---------------------- HANDLE FUNCTION ----------------------\
    const handleCheckout = async () => {
        // console.log(order);
        // console.log(total);
        // console.log("total detail: " + totalDetail);
        // console.log(discountPrice);
        // check all field is not empty
        if (order.CusName === "" || order.CusPhone === "" || order.CusAddress === "") {
            openNotificationWithIcon('error', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            const response = await axios.post('/order', {
                ...order,
                CustomerID: context.auth.id,
                OrderID: OrderId,
                TotalPrice: total.toString(),
                TotalDetailPrice: totalDetail.toString(),
                DiscountPrice: discountPrice.toString()
            });
            if (response.status === 201) {
                const data = response.data;
                //create order detail
                let orderDetailIdNumber = 0;
                cartList.map(async (product) => {
                    //create order detail id\
                    let orderDetailId = "";
                    try {
                        const response = await axios.get('/order_detail');
                        if (response.status === 200) {
                            const data = response.data;
                            orderDetailId = data[data.length - 1].OrderDetailID;
                            orderDetailId = orderDetailId.slice(3);
                            orderDetailId = parseInt(orderDetailId) + 1 + orderDetailIdNumber;
                            if (orderDetailId < 10) orderDetailId = "OD" + "00" + orderDetailId;
                            else if (orderDetailId < 100) orderDetailId = "OD" + "0" + orderDetailId;
                            else orderDetailId = "OD" + orderDetailId;
                            orderDetailIdNumber = orderDetailIdNumber + 1;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    try {
                        const response = await axios.post('/order_detail', {
                            OrderDetailID: orderDetailId,
                            OrderID: OrderId,
                            ProductID: product.ProductID,
                            Quantity: product.Quantity,
                            PriceID: product.DiaPriceID,
                            SalePrice: product.TotalPrice,
                            Currency: "VND",
                        });
                        if (response.status === 201) {
                            const data = response.data;
                            openNotificationWithIcon('success', 'Đặt hàng thành công');
                            localStorage.removeItem("cart");
                            navigate("/cart");
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                });

                handleAddPoint();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddPoint = async () => {
        try {
            const response = await axios.put(`/customer/${context.auth.id}`, {
                CusPoint: context.auth.cusPoint + OrderPoint,
            });
            if (response) {
                const data = response.data;
                openNotificationWithIcon('success', 'Đặt hàng thành công');
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Header />
            {contextHolder}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Breadcrumbs
                    aria-label="breadcrumb" sx={{ color: "#ffffff" }}
                >
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="#ffffff"
                        href="/"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center" }}
                        color="#ffffff"
                        href="/check-out"
                    >
                        Thanh toán
                    </Link>
                </Breadcrumbs>
            </div>
            <Typography variant="h3" className="custom_blog_title" style={{ textAlign: 'center', marginTop: '20px' }}>
                Thanh toan'
            </Typography>
            <main id="main" class="dark dark-page-wrapper">
                <div id="content" class="content-area page-wrapper" role="main">
                    <div class="row row-main">
                        <div class="col-inner">
                            <div class="woocommerce"><div class="woocommerce-notices-wrapper"></div><div class="woocommerce-notices-wrapper"></div>
                                <form name="checkout" method="post" class="checkout woocommerce-checkout ">
                                    <div class="row pt-0 ">
                                        <div class="large-7 col  ">
                                            <div id="customer_details">
                                                <div class="clear">
                                                    <div class="woocommerce-billing-fields">
                                                        <h3>Thông tin thanh toán</h3>
                                                        <div class="woocommerce-billing-fields__field-wrapper">
                                                            <p class="form-row form-row-first thwcfd-field-wrapper thwcfd-field-text validate-required" id="billing_first_name_field" data-priority="10">
                                                                <label for="billing_first_name" class="">Tên Quý Khách</label>
                                                                <span class="woocommerce-input-wrapper">
                                                                    <input
                                                                        type="text"
                                                                        class="input-text"
                                                                        name="billing_first_name"
                                                                        id="billing_first_name"
                                                                        placeholder="Nhập họ và tên"
                                                                        autocomplete="given-name"
                                                                        onChange={(e) => { setOrder({ ...order, CusName: e.target.value }) }}
                                                                    />
                                                                </span>
                                                            </p>
                                                            <p class="form-row form-row-last thwcfd-field-wrapper thwcfd-field-tel validate-required validate-phone" id="billing_phone_field" data-priority="20">
                                                                <label for="billing_phone" class="">Số điện thoại</label>
                                                                <span class="woocommerce-input-wrapper">
                                                                    <input type="tel" name="billing_phone" id="billing_phone" placeholder="Nhập điện thoại" autocomplete="tel"
                                                                        onChange={(e) => setOrder({ ...order, CusPhone: e.target.value })} />
                                                                </span>
                                                            </p>
                                                            <p class="form-row form-row-wide address-field thwcfd-field-wrapper thwcfd-field-text" id="billing_address_1_field" data-priority="30">
                                                                <label for="billing_address_1" class="">Địa chỉ
                                                                </label>
                                                                <span class="woocommerce-input-wrapper">
                                                                    <input type="text" class="input-text " name="billing_address_1" id="billing_address_1" placeholder="Nhập địa chỉ" autocomplete="address-line1"
                                                                        onChange={(e) => setOrder({ ...order, CusAddress: e.target.value })} />
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="clear">
                                                    <div class="woocommerce-shipping-fields">
                                                    </div>
                                                    <div class="woocommerce-additional-fields">
                                                        <h3>Thông tin bổ sung</h3>
                                                        <div class="woocommerce-additional-fields__field-wrapper">
                                                            <p class="form-row notes thwcfd-field-wrapper thwcfd-field-textarea" id="order_comments_field" data-priority=""><label for="order_comments" class="">Ghi chú đơn hàng<span class="optional">(tuỳ chọn)</span></label><span class="woocommerce-input-wrapper"><textarea onChange={(e) => setOrder({ ...order, OrdNote: e.target.value })} name="order_comments" class="input-text " id="order_comments" placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn." rows="2" cols="5"></textarea></span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="large-5 col">
                                            <div class="col-inner has-border">
                                                <div class="checkout-sidebar sm-touch-scroll">
                                                    <h3 id="order_review_heading">Đơn hàng của bạn</h3>
                                                    <div id="order_review" class="woocommerce-checkout-review-order">
                                                        <table class="shop_table woocommerce-checkout-review-order-table">
                                                            <thead>
                                                                <tr>
                                                                    <th class="product-name">Sản phẩm</th>
                                                                    <th class="product-total">Tạm tính</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {cartList.map((product) => (
                                                                    <tr class="cart_item">
                                                                        <td class="product-name">
                                                                            Product Name {product.ProductID + " " + product.GoldTypeID + " " + product.DiaPriceID + " " + product.DiaSmallPriceID}
                                                                            <strong class="product-quantity">×{product.Quantity}</strong>
                                                                        </td>
                                                                        <td class="product-total">
                                                                            <span class="woocommerce-Price-amount amount">
                                                                                {numberToVND(product.TotalPrice * product.Quantity)}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}

                                                            </tbody>
                                                            <tfoot>

                                                                <tr class="cart-subtotal">
                                                                    <th>Tạm tính</th>
                                                                    <td>
                                                                        <span class="woocommerce-Price-amount amount">
                                                                            {numberToVND(totalDetail)}
                                                                        </span></td>
                                                                </tr>
                                                                <tr class="order-total">
                                                                    <th>Tổng</th>
                                                                    <td>
                                                                        <strong>
                                                                            <span class="woocommerce-Price-amount amount">
                                                                                {numberToVND(total)}
                                                                            </span>
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>

                                                        <div id="payment" class="woocommerce-checkout-payment">
                                                            <ul class="wc_payment_methods payment_methods methods">
                                                                <li class="wc_payment_method payment_method_bacs">
                                                                    <input id="payment_method_bacs" type="radio" class="input-radio" name="payment_method" value="bacs" checked="checked" data-order_button_text="" />

                                                                    <label for="payment_method_bacs">
                                                                        Chuyển khoản ngân hàng 	</label>
                                                                    <div class="payment_box payment_method_bacs">
                                                                        <p>Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.</p>
                                                                    </div>
                                                                </li>
                                                                <li class="wc_payment_method payment_method_cod">
                                                                    <input id="payment_method_cod" type="radio" class="input-radio" name="payment_method" value="cod" data-order_button_text="" />

                                                                    <label for="payment_method_cod">
                                                                        Trả tiền mặt khi nhận hàng 	</label>
                                                                    <div class="payment_box payment_method_cod" style={{ display: 'none' }}>
                                                                        <p>Trả tiền mặt khi giao hàng</p>
                                                                    </div>
                                                                </li>
                                                                <Button
                                                                    variant="outlined"
                                                                    className="button btn-cart-to-checkout"
                                                                    onClick={handleCheckout}
                                                                    sx={{ backgroundColor: "#ffa733", color: "#ffffff", width: "100%", marginTop: "20px" }}
                                                                >
                                                                    Thanh toán
                                                                </Button>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </main >

            <Footer />
        </div >

    );
}
