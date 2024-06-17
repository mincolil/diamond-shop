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
import moment from 'moment';
import './OrderManage.css';
import CreateModal from "../../../components/Modal/OrderUpdateModal";


const numberToVND = (number) => {
    //check if number is string
    if (typeof number === 'string') {
        number = parseInt(number);
    }
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

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
    const context = useAuth();

    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deliveryEmployeeList, setDeliveryEmployeeList] = useState([]);
    const [orderIDUpdate, setOrderIDUpdate] = useState("");


    // --------------------- HANDLE OPEN MODAL UPDATE -----------------------------
    const handleLoadOrder = async (id) => {
        try {
            // console.log(id);
            setOrderIDUpdate(id);
            const data = await axios.get(`/order/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                console.log(data.data);
            }
        } catch (err) {
            console.log(err);
        }

        handleOpenModal();

    };

    //--------------------- HANDLE OPEN MODAL ----------------------------=
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCreate = (values) => {
        console.log('Creating with:', values);
        // Perform your create action here
        setModalVisible(false); // Close the modal after creating
        loadAllOrder();
    };

    const handleCancel = () => {
        setModalVisible(false);
        loadAllOrder();
    };

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllOrder(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `/order`
            )
                .then((data) => {
                    setData(data.data);
                    // console.log(data.data);
                })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllOrder();
    }, []);

    // --------------------------API GET ALL DELEVERY EMPLOYEE--------------------------------------
    const loadAllDeliveryEmployee = async () => {
        //employee have EmpNote = "Nhân viên vận chuyển"
        try {
            const data = await axios.get(`/employee`);
            if (data.error) {
                toast.error(data.error);
            } else {
                //get list employee have EmpNote = "Nhân viên vận chuyển"
                const deliveryEmployee = data.data.filter((item) => item.EmpNote === "Nhân viên vận chuyển");
                setDeliveryEmployeeList(deliveryEmployee);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadAllDeliveryEmployee();
    }, []);


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
            title: 'CusName',
            dataIndex: 'CusName',
            ...getColumnSearchProps('CusName'),
            key: 'CusName',
            sorter: (a, b) => a.CusName.length - b.CusName.length,
            sortOrder: sortedInfo.columnKey === 'CusName' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'SaleDate',
            dataIndex: 'SaleDate',
            key: 'SaleDate',
            sorter: (a, b) => moment(a.SaleDate).unix() - moment(b.SaleDate).unix(),
            sortOrder: sortedInfo.columnKey === 'SaleDate' ? sortedInfo.order : null,
            render: text => moment.utc(text).format("DD/MM/YYYY HH:mm:ss"),
            width: '8%'
        },
        {
            title: 'CusAddress',
            dataIndex: 'CusAddress',
            key: 'CusAddress',
            ...getColumnSearchProps('CusAddress'),
            sorter: (a, b) => a.CusAddress.length - b.CusAddress.length,
            sortOrder: sortedInfo.columnKey === 'CusAddress' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'CusPhone',
            dataIndex: 'CusPhone',
            ...getColumnSearchProps('CusPhone'),
            key: 'CusPhone',
            sorter: (a, b) => a.CusPhone.length - b.CusPhone.length,
            sortOrder: sortedInfo.columnKey === 'CusPhone' ? sortedInfo.order : null,
            width: '8%'
        },

        {
            title: 'TotalDetailPrice',
            dataIndex: 'TotalDetailPrice',
            key: 'TotalDetailPrice',
            sorter: (a, b) => a.TotalDetailPrice.length - b.TotalDetailPrice.length,
            sortOrder: sortedInfo.columnKey === 'TotalDetailPrice' ? sortedInfo.order : null,
            width: '8%',
            render: (TotalDetailPrice) => numberToVND(TotalDetailPrice)
        },
        {
            title: 'DiscountPrice',
            dataIndex: 'DiscountPrice',
            key: 'DiscountPrice',
            sorter: (a, b) => a.DiscountPrice.length - b.DiscountPrice.length,
            sortOrder: sortedInfo.columnKey === 'DiscountPrice' ? sortedInfo.order : null,
            width: '8%',
            render: (DiscountPrice) => numberToVND(DiscountPrice)
        },
        {
            title: 'TotalPrice',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
            sorter: (a, b) => a.TotalPrice.length - b.TotalPrice.length,
            sortOrder: sortedInfo.columnKey === 'TotalPrice' ? sortedInfo.order : null,
            width: '8%',
            render: (TotalPrice) => numberToVND(TotalPrice)
        },
        {
            title: 'OrderPoint',
            dataIndex: 'OrderPoint',
            key: 'OrderPoint',
            sorter: (a, b) => a.OrderPoint.length - b.OrderPoint.length,
            sortOrder: sortedInfo.columnKey === 'OrderPoint' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'ShipPrice',
            dataIndex: 'ShipPrice',
            key: 'ShipPrice',
            sorter: (a, b) => a.ShipPrice.length - b.ShipPrice.length,
            sortOrder: sortedInfo.columnKey === 'ShipPrice' ? sortedInfo.order : null,
            width: '8%',
            render: (ShipPrice) => numberToVND(ShipPrice)
        },
        {
            title: 'EmployeeIDShip',
            dataIndex: 'EmployeeIDShip',
            key: 'EmployeeIDShip',
            sorter: (a, b) => a.EmployeeIDShip.length - b.EmployeeIDShip.length,
            sortOrder: sortedInfo.columnKey === 'EmployeeIDShip' ? sortedInfo.order : null,
            width: '8%',
        },
        {
            title: 'OrdNote',
            dataIndex: 'OrdNote',
            key: 'OrdNote',
            sorter: (a, b) => a.OrdNote.length - b.OrdNote.length,
            sortOrder: sortedInfo.columnKey === 'OrdNote' ? sortedInfo.order : null,
            width: '8%'
        },
        {
            title: 'OrdStatus',
            dataIndex: 'OrdStatus',
            width: '8%',
            render: (OrdStatus) => (
                <span>
                    {
                        OrdStatus === 5
                            ? <Tag color="green">Complete</Tag>
                            : OrdStatus === 2
                                ? <Tag color="cyan">Confirm</Tag>
                                : OrdStatus === 3
                                    ? <Tag color="orange">Delivering</Tag>
                                    : OrdStatus === 4
                                        ? <Tag color="red">Cancelled</Tag>
                                        : <Tag color="blue">Waiting</Tag>
                    }
                </span>
            ),
            // filters: [
            //     {
            //         text: 'Waiting',
            //         value: undefined,
            //     },
            //     {
            //         text: 'Confirm',
            //         value: 2,
            //     },
            //     {
            //         text: 'Shipping',
            //         value: 3,
            //     },
            //     {
            //         text: 'Cancelled',
            //         value: 4,
            //     },
            //     {
            //         text: 'Complete',
            //         value: 5,
            //     },
            // ],
            // onFilter: (value, record) => record.OrdStatus === value,
        },
        //button edit
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={(e) => handleLoadOrder(record.OrderID)}>Chỉnh sửa</Button>
                </Space>
            ),
            width: '8%'
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        setSortedInfo(sorter);
    };

    return (
        <div style={{ backgroundColor: '#ffffff', height: '100vh', overflowX: 'auto' }}>
            {
                context.auth.role === 'staff'
                    ?
                    <>
                        <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
                    </>
                    :
                    <>
                        {/* <ButtonCustomize
                            onClick={handleCreate}
                            variant="contained"
                            // component={RouterLink}
                            nameButton="Thêm mới"
                            width="15%"
                            startIcon={<AddCircleOutlineIcon />}
                        /> */}

                        <div className="table-container">
                            <Table columns={columns} dataSource={data} onChange={onChange} />
                        </div>

                        <CreateModal
                            visible={modalVisible}
                            onCreate={handleCreate}
                            onCancel={handleCancel}
                            deliveryEmployeeList={deliveryEmployeeList}
                            orderIDUpdate={orderIDUpdate}
                        />

                    </>
            }
        </div>
    );

}

export default BasicTable;
