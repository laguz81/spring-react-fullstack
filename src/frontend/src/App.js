import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Badge, Breadcrumb, Button, Empty, Layout, Menu, Popconfirm, Spin, Table, Tag} from 'antd';
import {useEffect, useState} from "react";
import {deleteStudent, getAllStudents} from "./client";
import StudentDrawerForm from "./StudentDrawerForm";

import './App.css';
import Avatar from "antd/es/avatar/avatar";
import {errorNotificacion, successNotificacion} from "./Notificacion";

const {Header, Content, Footer, Sider} = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('Option 1', '1', <PieChartOutlined/>),
        getItem('Option 2', '2', <DesktopOutlined/>),
        getItem('User', 'sub1', <UserOutlined/>, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined/>),
    ];

    const fetchStudents = () =>
        getAllStudents()
            .then(data => {
                setStudents(data);
                console.log('fetchStudents');
            })
            .catch(err => {
                console.log(err.response.data);
                errorNotificacion("There was an issue", `${err.response.data.message} [${err.response.data.status}: ${err.response.data.error}] `);
            })
            .finally(()=>
                setFetching(false)
            );

    const removeStudent = (studentId, callBackFetchStudents) =>
        deleteStudent(studentId)
            .then(data => {
                successNotificacion("Eliminated student success",`Student with id: ${studentId} was deleted`);
                callBackFetchStudents();
            })
            .catch(err => {
                console.log(err.response.data);
                errorNotificacion("There was an issue", `${err.response.data.message} [${err.response.data.status}: ${err.response.data.error}] `);
            });


    useEffect(() => {
        fetchStudents();
    }, []);

    const TheAvatar = ({name}) => {
        let trim = name.trim();
        if (trim.length === 0) {
            return <Avatar icon={<UserOutlined/>}/>
        }
        const split = trim.split(" ");
        if (split.length === 1) {
            return <Avatar> {name.charAt(0).toUpperCase()} </Avatar>
        }
        return <Avatar>
            {`${name.charAt(0).toUpperCase()}${split[1].charAt(0).toUpperCase()}`}
        </Avatar>

    }

    const columns = fetchStudents => [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, student) => <TheAvatar name={student.name}/>
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, student) =>
                <>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure to delete this student ${student.name}?`}
                        onConfirm={() => removeStudent(student.id, fetchStudents)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                    <Button onClick={() => setShowDrawer(!showDrawer)}>Edit</Button>
                </>
        }
    ];

    function PrintStudent(students) {
        if (fetching) {
            return <Spin/>
        }
        if (students.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined/>}
                    size={"small"}>
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>

        }
        return (
            <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Table
                    dataSource={students}
                    columns={columns(fetchStudents)}
                    bordered
                    title={() =>
                        <>
                            <Tag>Number of students</Tag>
                            <Badge
                                count={students.length}
                                className="site-badge-count-109"
                                style={{
                                    backgroundColor: "#108ee9",
                                }}/>
                            <br/><br/>
                            <Button
                                onClick={() => setShowDrawer(!showDrawer)}
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined/>}
                                size={"small"}>
                                Add New Student
                            </Button>
                        </>
                    }
                    pagination={{pageSize: 50}}
                    scroll={{y: 500}}
                    rowKey={(student) => student.id}
                />
            </>
        );
    }

    return (
        <>
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            {PrintStudent(students)}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Sistemas FV ©2022 Created @lguzman
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}

export default App;
