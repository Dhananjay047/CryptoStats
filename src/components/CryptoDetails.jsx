import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
//import Loader from './Loader';
//import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const {coinId} = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const { data , isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data:coinHistory,} = useGetCryptoHistoryQuery({ coinId, timePeriod});
    const cryptoDetails = data?.data?.coin;

    if(isFetching) return "Loading...."

    
    //console.log(data);
    console.log(coinHistory);

    const time = ['24h', '7d', '30d', '1y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];


    return (
        <>
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title level={2} className="coin-name">
                        {cryptoDetails.name} ({cryptoDetails.slug})
                    </Title>
                    <p >
                        {cryptoDetails.name} live prince in US dollars.
                        View value Statistics, Market Cap , supply. 
                    </p>
                </Col>
                <Select 
                    defaultValue="7d" 
                    className="select-timeperiod" 
                    placeholder="Select Time Period" 
                    onChange={(value) => setTimePeriod(value)}
                >
                    {time.map((timing) => 
                        <Option value={timing}>{timing}</Option>
                    )}  
                </Select>
                <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />        
                <Col className="stats-container">
                    <Col xs={23} sm={11} lg={11} className="coin-value-statistics">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">
                                {cryptoDetails.name} value Statistics
                            </Title>
                            <p>This is an overview showing the stats of <strong>{cryptoDetails.name}</strong></p>
                        </Col>
                        {stats.map(({icon,title,value})=>(
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                    <Col xs={23} sm={11} lg={11} className="other-stats-info">
                        <Col className="coin-value-statistics-heading">
                            <Title level={3} className="coin-details-heading">
                                Other Statistics
                            </Title>
                            <p>General stats of all coins</p>
                        </Col>
                        {genericStats.map(({icon,title,value})=>(
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="stats">{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-desc-link">
                    <Row className="coin-desc">
                        <Title level={3} className="coin-details-heading">
                            What is {cryptoDetails.name}
                            {HTMLReactParser(cryptoDetails.description)}
                        </Title>        
                    </Row>
                    <Col className="coin-links">
                        <Title level={4}>Related links</Title>
                        {cryptoDetails.links.map((link)=>(
                            <Row className="coin-link">
                                <Title level={5} className="link-name">
                                    {link.type}
                                </Title>
                                <a href={link.url} target="_blank" rel="noreferrer">
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                    </Col>                  
                </Col>
            </Col>
        </>
    )
}

export default CryptoDetails
