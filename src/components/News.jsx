import React,{useState} from 'react'
import moment from 'moment'
import { Select, Typography, Row, Col, Card, Avatar} from 'antd'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi' 


const { Text, Title} = Typography;
const { Option } = Select

const News = ({ simplified }) => {
    const newsCount = simplified ? 6 : 21
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data:cryptoNews,} = useGetCryptoNewsQuery({ newsCategory:newsCategory, count: newsCount});
    const { data: crptosList} = useGetCryptosQuery(100);

    const demoImg = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"
    //console.log(cryptoNews);

    if(!cryptoNews?.value) return "Loading...."

    return (
        <>
            <Row gutter={[24,24]} >
                { simplified ? "" : (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a crypto"
                            optionFilterProp = "children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
                        >
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {crptosList?.data?.coins.map(
                                (coin) => (
                                    <Option value={coin.name}>{coin.name}</Option>
                                )
                            )}
                        </Select>
                    </Col>
                )}
                {
                    cryptoNews.value.map((news,i) => 
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card hoverable className="news-card">
                                <a href={news.url} target="_blank" rel="noreferrer">
                                    <div className="news-image-container">
                                        <Title className="news-title" level={4} >{news.name}</Title>
                                        <img style={{maxHeight:"100px",maxWidth:"200px",borderRadius:"5%"}} src={news?.image?.thumbnail?.contentUrl || demoImg} alt="news"></img>
                                    </div>
                                    <p>
                                        {
                                            news.description > 100 ? `${news.description.substring(0,100)}...` : news.description 
                                        }
                                    </p>
                                    <div className="provider-container">
                                        <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImg } alt="" />
                                            <Text className="provider-name" >{news.provider[0]?.name}</Text>
                                        </div>
                                        <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>         
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </>
    )
}

export default News
