import React from 'react';
import ResultTable from "../components/ResultTable";
import {Card} from "antd";

const HomePage = () => {
    return (
        <Card className='shadow-lg'>
           <ResultTable/>
        </Card>
    );
};

export default HomePage;