import React, {useEffect, useState} from "react";
import {Badge, Col, Row, Table} from 'antd';
import {getResultRequest} from "../APIRequest/resultApi";
import Search from "antd/es/input/Search";


const ResultTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true)
        getResultRequest('0').then(res => {
            setLoading(false)
            setData(res[0]['rows']);
        })
    }, [])
    const onSearch = (value)=>{
        setLoading(true)
        if (!value){
            getResultRequest('0').then(res => {
                setLoading(false)
                setData(res[0]['rows']);
            })
        }else {
            getResultRequest(1, 5, value).then(res => {
                setLoading(false)
                setData(res[0]['rows']);
            })
        }


    }

   /* const rowClassName = (record, index) => {
       return record.result === 'Failed' ? 'text-danger' :  'text-success';
    }*/

    const grade = (value)=>{
        if (value >= 80 && value <= 100){
          return <Badge count='A+' color="hsl(102, 53%, 61%)"  offset={[14, -6]}>
                {value}
            </Badge>
        }
        if (value >= 70 && value <= 79){
          return <Badge count='A' color="hsl(102, 53%, 61%)"  offset={[10, -6]}>
                {value}
            </Badge>
        }
        if (value >= 60 && value <= 69){
          return <Badge count='A-' color="hsl(102, 53%, 61%)"  offset={[10, -6]}>
                {value}
            </Badge>
        }
        if (value >= 50 && value <= 59){
          return <Badge count='B' color="hsl(102, 53%, 61%)"  offset={[10, -6]}>
                {value}
            </Badge>
        }
        if (value >= 40 && value <= 49){
          return <Badge count='C' color="hsl(102, 53%, 61%)"  offset={[10, -6]}>
                {value}
            </Badge>
        }
        if (value >= 33 && value <= 39){
          return <Badge count='D' color="hsl(102, 53%, 61%)"  offset={[10, -6]}>
                {value}
            </Badge>
        }
        if (value <= 32){
          return <Badge count='F' color='red' offset={[10, -6]}>
                {value}
            </Badge>
        }

    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Roll',
            dataIndex: 'roleNo',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.roleNo - b.roleNo,
        },
        {
            title: 'English',
            dataIndex: 'english',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.english - b.english,
            render: (value) => {
                let color = value <= 32 ? 'text-danger' : '';

                return (
                    <p className={color} key={value}>
                        {
                            grade(value)
                        }
                    </p>
                );
            },
        },
        {
            title: 'Math',
            dataIndex: 'math',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.math - b.math,
            render: (value) => {
                let color = value <= 32 ? 'text-danger' : '';

                return (
                    <p className={color} key={value}>
                        {
                            grade(value)
                        }
                    </p>
                );
            },
        },
        {
            title: 'Accountancy',
            dataIndex: 'accountancy',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.accountancy - b.accountancy,
            render: (value) => {
                let color = value <= 32 ? 'text-danger' : '';

                return (
                    <p className={color} key={value}>
                        {
                            grade(value)
                        }
                    </p>
                );
            },
        },
        {
            title: 'Economics',
            dataIndex: 'economics',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.economics - b.economics,
            render: (value) => {
                let color = value <= 32 ? 'text-danger' : '';

                return (
                    <p className={color} key={value}>
                        {
                            grade(value)
                        }
                    </p>
                );
            },
        },
        {
            title: 'Business Studies',
            dataIndex: 'businessStudies',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.businessStudies - b.businessStudies,
            render: (value) => {
                let color = value <= 32 ? 'text-danger' : '';

                return (
                    <p className={color} key={value}>
                        {
                            grade(value)
                        }
                    </p>
                );
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.total - b.total,
        },
        {
            title: 'Average',
            dataIndex: 'average',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.average - b.average,
        },

        {
            title: 'Result',
            dataIndex: 'result',
            filters: [
                {
                    text: 'Passed',
                    value: 'Passed',
                },
                {
                    text: 'Failed',
                    value: 'Failed',
                },
            ],
            render: (value) => {

               let color = value === 'Failed' ? 'text-danger' : 'text-success';

                return (
                    <p className={color} key={value}>
                        {value.toUpperCase()}
                    </p>
                );
            },
            onFilter: (value, record) => record.result.indexOf(value) === 0,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
       /* console.log('params', pagination, filters, sorter, extra);*/
    };




    return (
        <>
            <Row>
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8}>
                    <Search
                        placeholder="search name/roll"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                        rootClassName='mb-4'
                    />
                </Col>
            </Row>

            <Table
                bordered={true}
                pagination={{position: ["bottomCenter"]}}
                columns={columns}
                dataSource={data}
                onChange={onChange}
                loading={loading}
            />
        </>
    )
}
export default ResultTable