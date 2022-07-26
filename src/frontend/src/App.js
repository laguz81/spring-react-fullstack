import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import {Breadcrumb, Empty, Layout, Menu, Spin, Table} from 'antd';
import {useEffect, useState} from "react";
import {getAllStudents} from "./client";
import './App.css';

const {Header, Content, Footer, Sider} = Layout;

function App() {

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
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        getAllStudents()
            .then(data => {
                    setStudents(data);
                    setFetching(false);
                }
            )
        ;


    }, []);
    const [students, setStudents] = useState([]);
    const [fetching, setFetching] = useState(true);


    const columns = [
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
    ];

    function PrintStudent(students) {
        if (fetching) {
            return <Spin/>
        }
        if (students.length <= 0) {
            return <Empty/>
        }
        return (
            <Table
                dataSource={students}
                columns={columns}
                bordered
                title={() => 'Students'}
                pagination={{pageSize: 50}}
                scroll={{y: 240}}
                rowKey={(student)=>student.id}
            />
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
