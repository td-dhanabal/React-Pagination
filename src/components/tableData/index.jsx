import React from 'react';
import { Table, Pagination, Row, Col, Button, Modal, Form, Input, } from 'antd';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../api/http';
import serviceApi from '../../api/serviceApi';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import Header from '../header';
import './index.scss';

const columns = [
    {
        title: 'First name',
        dataIndex: 'firstname',
        width: '20%',
    },
    {
        title: 'Last name',
        dataIndex: 'lastname',
        width: '20%',
    },
    {
        title: 'Mobile number',
        dataIndex: 'mobilenumber',

    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];

const TableData = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableParams, setTableParams] = useState({
        page: 0,
        size: 0,
        userCount: 0
    });
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const fetchUsersData = async () => {
        setLoading(true);
        try {
            const userResponse = await getRequest(serviceApi.allUsers())
            if (userResponse) {
                setData(userResponse.data.data);
                setLoading(false);
                setTableParams(prev => {
                    prev['size'] = userResponse.data.size;
                    prev['page'] = userResponse.data.page
                    prev['userCount'] = userResponse.data.userCount
                    return { ...prev }
                });
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchUsersData();
    }, []);

    const handleTableChange = async (page, size) => {
        if (tableParams.page !== page) {
            try {
                setLoading(true);
                const userResponse = await getRequest(serviceApi.page(page))
                setData(userResponse.data.data);
                setTableParams(prev => {
                    prev['size'] = userResponse.data.size;
                    prev['page'] = parseInt(userResponse.data.page)
                    prev['userCount'] = userResponse.data.userCount
                    return { ...prev }
                });
                setLoading(false);
            } catch (error) {

            }
        } else {
            try {
                setLoading(true);
                const userResponse = await getRequest(serviceApi.size(size))
                setData(userResponse.data.data);
                setTableParams(prev => {
                    prev['size'] = userResponse.data.size;
                    prev['page'] = parseInt(userResponse.data.page)
                    prev['userCount'] = userResponse.data.userCount
                    return { ...prev }
                });
                setLoading(false);
            } catch (error) {

            }
        }
    };
    const handleRegisterSubmit = async (data) => {
        console.log('data', data);
        try {
            const response = await postRequest(serviceApi.createUser(), data);
            if (response) {
                toast.success("User Created Successfully");
                setIsModalOpen(false);
                fetchUsersData();
            }
        } catch (error) {
            console.log('err', error);
            toast.error(error)
        }
    };
    return (
        <>
            <Header />
            <div className='body-container'>
                <Row className='title-body' gutter={16} style={{ margin: 0 }}>
                    <Col className="gutter-row right-content" span={12} >
                        <h3>Users</h3>
                    </Col>
                    <Col className="gutter-row left-side-content" span={12} >
                        <Button onClick={showModal}>Add User<PlusOutlined /></Button>
                    </Col>
                </Row>
                <div className='table-container'>
                    <Table
                        columns={columns}
                        // rowKey={(record) => record.login.uuid}
                        dataSource={data}
                        loading={loading}
                        pagination={false}
                    />
                </div>
                <div className='pagination-container'>
                    <Pagination showSizeChanger onChange={handleTableChange}
                        // defaultCurrent={1}
                        loading={loading}
                        current={tableParams?.page}
                        total={tableParams?.userCount}
                    // pageSize={tableParams?.size}
                    // defaultPageSize={tableParams?.size}
                    />
                </div>
                <Modal title="Create User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <Form
                        name="userCreateForm"
                        onFinish={handleRegisterSubmit}
                        autoComplete="off"
                    >
                        <Form.Item name="firstname">
                            <Input
                                placeholder="First Name"
                                className="input-box"
                                title="First name can only contain alphabets"
                                type="text"
                            />
                        </Form.Item>
                        <Form.Item name="lastname">
                            <Input
                                placeholder="Last Name"
                                className="input-box"
                                type="text"
                            />
                        </Form.Item>
                        <Form.Item name="email">
                            <Input
                                placeholder="Email"
                                className="input-box"
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item name="mobilenumber">
                            <Input
                                placeholder="Mobile Number"
                                className="input-box"
                                type="number"
                            />
                        </Form.Item>
                        <div className='submit-btn'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="form-submit-btn spacer"
                            >
                                Create
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

export default TableData;
