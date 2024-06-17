import * as React from "react";
import Background from "../../image/back.jpg";
import { ToastContainer } from "react-toastify";
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Button as AntButton, Input, Space } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { notification } from 'antd';

const PHONE_NUMBER_REGEX = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullname: "",
        username: "",
        phone: "",
        address: "",
        password: "",
        passwordConfirm: "",
    });

    const StyledNavLink = styled(NavLink)`text-decoration: none;`;

    //-----------------handle function-------------------
    //handle submit
    const handleSubmit = async (e) => {
        console.log(data);
        e.preventDefault();
        //check empty 
        if (Object.values(data).some((item) => item === "")) {
            openNotificationWithIcon('error', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (data.password !== data.passwordConfirm) {
            openNotificationWithIcon('error', 'Mật khẩu không khớp');
            return;
        }
        if (!PHONE_NUMBER_REGEX.test(data.phone)) {
            openNotificationWithIcon('error', 'Số điện thoại không hợp lệ');
            return;
        }
        try {
            const res = await axios.post("/customer", {
                CusPhone: data.phone,
                CusName: data.fullname,
                CusAddress: data.address,
                CusPassword: data.password,
                CusUsername: data.username,
            }).then((data) => {
                openNotificationWithIcon('success', 'Đăng ký thành công');
                navigate("/sign-in");
            });
        } catch (error) {
            openNotificationWithIcon('error', 'Đăng ký thất bại');
        }
    };


    //ant notify
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, des) => {
        api[type]({
            message: 'Notification Title',
            description: des,
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {contextHolder}
            <Grid container component="main" sx={{
                height: "100vh", backgroundImage:
                    `url(${Background})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                    t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: '#2a2a2a' }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Link href="/" ><Box
                            sx={{ xs: 1, zIndex: "1" }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img src={'https://daokimcuong.vn/wp-content/uploads/2021/05/logo1-removebg-preview-1.png'} alt="" style={{ maxWidth: "30%" }} />
                            </Box>
                        </Box></Link>

                        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: '#ffffff' }}>
                            Tạo tài khoản
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            sx={{
                                width: "70%",
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
                                FullName
                            </Typography>
                            <Input placeholder="fullname" prefix={<UserOutlined />} onChange={(e) => setData({ ...data, fullname: e.target.value })} />
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
                                Phone
                            </Typography>
                            <Input placeholder="phone" prefix={<PhoneOutlined />} onChange={(e) => setData({ ...data, phone: e.target.value })} />
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
                                Address
                            </Typography>
                            <Input placeholder="Address" prefix={<HomeOutlined />} onChange={(e) => setData({ ...data, address: e.target.value })} />
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }} >
                                Username                            </Typography>
                            <Input placeholder="username" prefix={<UserOutlined />} onChange={(e) => setData({ ...data, username: e.target.value })} />
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }} >
                                Password
                            </Typography>
                            <Input.Password
                                placeholder="password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
                                Re-type Pasword
                            </Typography>
                            <Input.Password
                                placeholder="re-password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                onChange={(e) => setData({ ...data, passwordConfirm: e.target.value })}
                            />

                            <Button
                                color="warning"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Tạo
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <StyledNavLink to="/reset-password" variant="body2">
                                        Quên mật khẩu?
                                    </StyledNavLink>
                                </Grid>
                                <Grid item>
                                    <StyledNavLink to="/sign-in" variant="body2">
                                        {"Đăng nhập tại đây!"}
                                    </StyledNavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}