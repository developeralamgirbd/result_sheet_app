import React from 'react';
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import {createResultRequest} from "../APIRequest/resultApi";
import {useNavigate} from "react-router-dom";

const ResultForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const values = form.getFieldsValue();
        createResultRequest(values).then(result => {
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
                    <Input  />
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