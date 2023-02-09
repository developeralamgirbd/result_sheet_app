import React from 'react';
import {Card} from "antd";
import ResultForm from "../components/ResultForm";

const CreatePage = () => {
    return (
        <Card className='shadow-lg d-flex justify-content-center'>
            <ResultForm/>
        </Card>
    );
};

export default CreatePage;