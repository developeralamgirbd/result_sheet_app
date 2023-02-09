import React, {useEffect} from 'react';
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import {createUpdateResultRequest, getStudentRequest} from "../APIRequest/resultApi";
import {useNavigate, useParams} from "react-router-dom";

const ResultForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{

        if (id){
            getStudentRequest(id).then(res => {
                form.setFieldsValue({
                    name: res.name,
                    roleNo: res.roleNo,
                    accountancy: res.accountancy,
                    english: res.english,
                    math: res.math,
                    economics: res.economics,
                    businessStudies: res.businessStudies,
                })
            })
        }

    }, [id, form])

    const handleSubmit = () => {
        const values = form.getFieldsValue();
        createUpdateResultRequest(values, id).then(result => {
            if (result){
                navigate('/');
            }
        })
    };


    return (
        <>
            <Form
                layout='vertical'
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item label="Name" name='name'>
                    <Input />
                </Form.Item>
                <Form.Item label="Roll" name='roleNo'>
                    <Input readOnly={id} />
                </Form.Item>
                <Row gutter={[16, 16]}>
                    <Col>
                        <Form.Item label="English" name='english'>
                            <InputNumber min={0} max={100} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="Math" name='math'>
                            <InputNumber min={0} max={100} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="Accountancy" name='accountancy'>
                            <InputNumber min={0} max={100} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="Economics" name='economics'>
                            <InputNumber min={0} max={100} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="Business Study" name='businessStudies'>
                            <InputNumber min={0} max={100} />
                        </Form.Item>
                    </Col>
                </Row>


                <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ResultForm;