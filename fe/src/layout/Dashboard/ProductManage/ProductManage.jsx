import * as React from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonCustomize from "../../../components/Button/Button";
import { useRef, useState, useEffect, useCallback } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words'

// -------------------------------STYLE MODAL----------------------
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const BasicTable = () => {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;


    const [option, setOption] = useState("");
    const context = useAuth();

    const [data, setData] = useState([]);
    const [role, setRole] = useState(" ");
    const [gender, setGender] = useState(true);
    const [fullname, setFullName] = useState("");
    const [password, setPassWord] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("");

    // --------------------- MODAL HANDLE -----------------------------

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // --------------------- HANDLE ROLE -----------------------------
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    // --------------------- HANDLE GENDER -----------------------------
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    // --------------------- HANDLE OPEN MODAL CREATE -----------------------------
    const handleCreate = (event) => {
        setFullName(" ")
        setEmail(" ")
        setPhone(" ")
        setAddress(" ")
        setPassWord(" ")
        setRole("admin")
        setOption("create");
        handleOpen();
    };

    // --------------------- HANDLE OPEN MODAL UPDATE -----------------------------
    const handleLoadUserbId = async (id, password) => {
        try {
            // console.log(id);
            const data = await axios.get(`/user/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                // console.log(data.data);
                setId(data.data._id)
                setFullName(data.data.fullname)
                setEmail(data.data.email)
                setPhone(data.data.phone)
                setAddress(data.data.address)
                setPassWord(password)
                setStatus(data.data.status)
                setRole(data.data.role)
            }
        } catch (err) {
            console.log(err);
        }

        setOption("update");
        handleOpen();

        // console.log(event);
    };

    // --------------------- HANDLE UPDATE -----------------------------

    const handleUpdate = async () => {
        // console.log(gender)
        try {
            const data = await axios.patch(`/user`, {
                fullname: fullname,
                password: password,
                email: email,
                address: address,
                phone: phone,
                gender: gender,
                role: role,
                status: status
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                // console.log(data);
                toast.success("Cập nhật thành công");
                handleClose()
                loadAllProduct(DEFAULT_PAGE, DEFAULT_LIMIT);
            }
        } catch (err) {
            toast.error("Vui lòng điền đầy đủ thông tin");
        }
    }

    // --------------------- HANDLE CREATE USER -----------------------------
    // useEffect(() => {
    const handleCreateUser = async (event) => {
        try {
            await axios.post("/user", {
                fullname,
                email,
                password,
                passwordConfirm: confirmPass,
                role,
                address,
                phone,
                gender,
                status: 'verifying'
            })
                .then((data) => {
                    if (data.data.error === 'Email was taken') {
                        alert('Email đã được sử dụng')
                    } else {
                        toast.success("Đăng ký thành công!");
                        // console.log(data)
                        handleClose();
                        loadAllProduct(DEFAULT_PAGE, DEFAULT_LIMIT);
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data.error);
                })
        } catch (err) {
            console.log(err);
        }
    };
    // })

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllProduct(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/product`
            )
                .then((data) => {
                    setData(data.data);
                    console.log(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllProduct();
    }, []);
    // ----------------------------------------------------------------

    const handleInactiveAccount = async (inActiveStatus) => {

        if (window.confirm(
            inActiveStatus === 'inactive'
                ? "Bạn có muốn KHOÁ tài khoản này không ?"
                : "Bạn có muốn KÍCH HOẠT tài khoản này không ?") === true) {
            try {
                // console.log(fullname, email, role, inActiveStatus)
                await axios.patch(`/user`, {
                    fullname: fullname,
                    email: email,
                    role: role,
                    address: address,
                    phone: phone,
                    gender: gender,
                    status: inActiveStatus
                })
                    .then((data) => {
                        handleClose()
                        loadAllProduct(DEFAULT_PAGE, DEFAULT_LIMIT);
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            } catch (err) {
                console.log(err);
            }
        }
    };

    // ----------------------------------------------------------------

    const errorStyle = {
        color: "red",
        // backgroundColor: "DodgerBlue",
        paddingLeft: "15px",
        fontSize: "12px"
    };


    // --------------------- ANT TABLE -----------------------------
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [sortedInfo, setSortedInfo] = useState({});
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex, field) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            if (field == 'name') {
                return record.userId.fullname.toLowerCase().includes(value.toLowerCase());
            } else if (field == 'phone') {
                return record.userId.phone.toLowerCase().includes(value.toLowerCase());
            } else {
                if (record[dataIndex]) return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            }

        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'ProductID',
            ...getColumnSearchProps('ProductID'),
            key: 'ProductID',
            sorter: (a, b) => a.ProductID.length - b.ProductID.length,
            sortOrder: sortedInfo.columnKey === 'ProductID' ? sortedInfo.order : null,
        },
        {
            title: 'ProTypeID',
            dataIndex: 'ProTypeID',
            ...getColumnSearchProps('ProTypeID'),
        },
        {
            title: 'GoldID',
            dataIndex: 'GoldID',
            ...getColumnSearchProps('GoldID'),
        },
        {
            title: 'DiamondID',
            dataIndex: 'DiamondID',

        },
        {
            title: 'DiamondSmallID',
            dataIndex: 'DiamondSmallID',
        },
        {
            title: 'DiaSmallQuantity',
            dataIndex: 'DiaSmallQuantity',
        },
        {
            title: 'WagePrice',
            dataIndex: 'WagePrice',
        },
        {
            title: 'Ration',
            dataIndex: 'Ration',
        },
        //button edit
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => handleLoadUserbId(record._id, record.password)}>Chỉnh sửa</Button>
                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            {
                context.auth.role === 'staff'
                    ?
                    <>
                        <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
                    </>
                    :
                    <>
                        <ButtonCustomize
                            onClick={handleCreate}
                            variant="contained"
                            // component={RouterLink}
                            nameButton="Thêm mới"
                            width="15%"
                            startIcon={<AddCircleOutlineIcon />}
                        />



                        <Table columns={columns} dataSource={data} onChange={onChange} />
                    </>
            }
        </div>
    );
}

export default BasicTable;
