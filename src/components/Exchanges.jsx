import React from 'react'
import { Row, Col, Typography, Collapse, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import {useGetExchangesQuery} from '../services/cryptoApi'
import millify from 'millify';

const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {

    const {data,isFetching} = useGetExchangesQuery();
    const totalExchanges = data?.data?.exchanges;

    function callback(key) {
        console.log(key);
    }

    const Header = ({rank, name, volume, market, change ,image }) => {
        return (
            <Row>
                <Col xs={12} sm={12} lg={6}>
                    <Text><strong>{rank}.</strong></Text>
                    <Avatar className="exchange-image" src={image} />
                    <Text><strong>{name}</strong></Text>
                </Col>
                <Col xs={12} sm={12} lg={6}>$ {millify(volume)}</Col>
                <Col xs={12} sm={12} lg={6}>{millify(market)}</Col>
                <Col xs={12} sm={12} lg={6}>{millify(change)}%</Col>
            </Row>
        )
    }

    if(isFetching) return "Loader.."

    console.log(totalExchanges);

    return (
        <>
            <Typography.Title level={1}>Exchanges</Typography.Title>
            <Row>
                <Col xs={12} sm={12} lg={6}>Exchanges</Col>
                <Col xs={12} sm={12} lg={6}>Volume</Col>
                <Col xs={12} sm={12} lg={6}>Market</Col>
                <Col xs={12} sm={12} lg={6}>Change</Col>
            </Row>
            <Collapse defaultActiveKey={['1']} onChange={callback}>  
            {totalExchanges.map((item)=>(
                <Panel 
                    showArrow={false}
                    key={item.id} 
                    header={<Header 
                        rank={item.rank}
                        image={item.iconUrl} 
                        name={item.name} volume={item.volume} 
                        market={item.numberOfMarkets} 
                        change={item.marketShare} 
                        />} 
                    >
                    {HTMLReactParser(item.description || '')}
                </Panel>
            ))}
            </Collapse>
        </>
    )
}

export default Exchanges
