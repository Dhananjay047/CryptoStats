import { Link,Switch,Route } from 'react-router-dom'
import {Space,Typography,Layout} from 'antd'

import {Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News} from './components' 

import './App.css';

function App() {
  return (
    <div className="app">
      <div className="navbar"> 
        <Navbar/>
      </div>
      <div className='main'>
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route> 
            </Switch>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{color:"#FFF", textAlign:"center" }}>
              Crypto Stats <br />
              All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
