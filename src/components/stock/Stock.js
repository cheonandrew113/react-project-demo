import React, { Component } from "react";
// import Selector from "./Selector";
import axios from "axios";
import Charts from '../chart/Charts'
// import Wallet from './Wallet'
import './stock.css';
import News from './News'

import { data } from '../../allStock.js'
import Select from 'react-select';
// import Popup from 'reactjs-popup'
// import { connect } from 'react-redux'
// import { createProject } from '../../store/actions/projectActions'
// import { Redirect } from 'react-router-dom'
import firebase from '../../config/fbConfig'
// import firebase from 'firebase/app'
import 'firebase/database'
import WatchList from './Watchlist'


const options = data

class Stock extends Component {

// constructor(props){
//   super(props)
  
  
//   this.db = firebase.database().ref.child('watchlist')
//   console.log("fire!", firebase.database)

// }  

  
  state = {
    stock: "",
    color: "",
    openColor: "",
    news: "",
    stockChartXValues: [],
    stockChartYValues: [],
    watchlist: [],
    wallet: 100000,
    entered: "",
    data: null
  };


  // componentWillMount(){
  //   const previousWatchlist = this.state.watchlist
    
  //   firebase.database().on('child_added', snap => {
  //     previousWatchlist.push({
  //       id: snap.key,
  //       watchlistContent: snap.val().watchContent
  //     })
  //     this.setState({
  //       watchlist: previousWatchlist
  //     })
  //   })
  
  // }

  // componentDidMount() {
  //   this.setState({ stock: { name: "NFLX" } })
  // }

  stockHistory = (symbol) => {
    const promise = fetch(`https://api.worldtradingdata.com/api/v1/history?symbol=${symbol}&api_token=gdMSThs2CG5iSj5V9UUJro9n89E5rJ28CcbyW7W7LZcLrIGBGr8ilIr6fY7i`)
    // fetch(`https://api.worldtradingdata.com/api/v1/history?symbol=SNAP&api_token=gdMSThs2CG5iSj5V9UUJro9n89E5rJ28CcbyW7W7LZcLrIGBGr8ilIr6fY7i`)

        .then(response => response.json())
        .then(data => {
          
          if(data.Message){
            this.setState({
              stock: {
                symbol: `Sorry no results found for ${symbol}!`
              }
            })
          }
          else{
            let initialArrayOutput = []
            let dataObj = data["history"]
          
            // console.log(dataObj)
            for (var prop in dataObj){
                initialArrayOutput.push({open: parseInt(dataObj[prop]['open']), high: parseInt(dataObj[prop]['high']), low: parseInt(dataObj[prop]['low']), close: parseInt(dataObj[prop]['close']), volume: parseInt(dataObj[prop]['volume']), datetime: prop, date: new Date(prop)})
            }
            // console.log("initial", initialArrayOutput)
            //ARRAY NEEDS TO BE REVERSED FOR THE CHART TO SHOW THE TIME SERIES IN CORRECT FORMAT
            let finaleArrayOutput = initialArrayOutput.reverse()
            // console.log("after", finaleArrayOutput)
            return finaleArrayOutput
          }
        //  console.log(data) 
        })
        
      .then(data => {   
            
          this.setState({ data })
      })
      .catch(() =>
        this.setState({
          stock: {
            symbol: `Sorry no results found for ${symbol}!`
          },
          news: ""
        })
      );
    return promise;
}

  dailyStock = (symbol) => {
    axios
      .get(`https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=gdMSThs2CG5iSj5V9UUJro9n89E5rJ28CcbyW7W7LZcLrIGBGr8ilIr6fY7i`)
      .then(res => {

        this.setState({ stock: res.data.data[0], openLabel: "Open:" }) 
        return axios.get(
          `https://newsapi.org/v2/everything?q=${
            this.state.stock.name
          }&apiKey=5107470458de43df9c8337e977c2c199`
        );
      })
      .then(
        res => {
        this.setState({ news: res.data.articles });
        if (this.state.stock.price > this.state.stock.price_open) {
          this.setState({ color: "green", openColor: "red" });
        }
        if (this.state.stock.price < this.state.stock.price_open) {
          this.setState({ color: "red", openColor: "green" });
        }
        if (this.state.stock.price === this.state.stock.price_open) {
          this.setState({ color: "black", openColor: "black" });
        }
      })
      // .catch((errors) => {
      //   console.error("error:", errors)
      //   this.setState({
      //         stock: {
      //           symbol: `Sorry no results found for ${symbol}!`
      //         }
      //       })
      // })
      .catch(() =>
        this.setState({
          stock: {
            symbol: `Sorry no results found for ${symbol}!`
          },
          news: ""
        })
      );
  }
 
  clickHandler = (e) => {
    // console.log("adding this stock", this.state.stock)
    e.preventDefault()
    
    const db = firebase.firestore()
    db.settings({
      timestampsInSnapshots: true
    })

    db.collection("watchlist").add({
      watchlist: this.state.watchlist
    })

    // this.setState({
    //   watchlist: [...this.state.watchlist, this.state.stock]
    // })
    // this.database.push().set({watchlistContent: watchlist})
    // this.props.createProject(this.state.watchlist);
    // this.props.history.push('/');
  }      

    //////////////database////////////////////////
  // state = {
  //   title: '',
  //   content: ''
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(this.state);
  //   this.props.createProject(this.state.watchlist);
  //   this.props.history.push('/');
  // }

  //////////////database////////////////////////

  // buyHandler = () => {
  //   console.log("I was clikcked")
  //   const mappedWatchList = this.state.watchlist.map(stock => console.log("stocking", stock))
  //   this.setState({
  //     wallet: this.state.wallet - (this.state.watchlist.map(stock => stock.price))
  //   })
  // }

   
  changeHandler = e => {   
    this.setState({
      entered: e.value
    })
  // console.log(`Option selected:`, e);
  }

  gettingData = (e) => {
    e.preventDefault();
    this.stockHistory(this.state.entered.toLowerCase())
    this.dailyStock(this.state.entered.toLocaleLowerCase())
  }

  componentDidMount() {
    this.gettingData
  }


  currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  render() {
    // console.log("entire state:", this.state)
    

    {this.gettingData}
    return (
      <div id="container">
        <div id="instructions">
                <header className="header">
                    <h5>Instructions</h5>
                
                  <div className="instruction-detail">
                    <ol >
                      <li>Choose a company in the dropdown</li>
                      <li>Once selected, hit or click the enter button</li>
                      <li>Browse the selected stock quote and news</li>
                      <li>To select a different stock, repeat steps 1-3</li>
                    </ol>
                  </div>
                </header>
            
        </div>
          {/* <div>
            <h4 id='title'>Watchlist</h4>
            <table id='watchlist'>
                    <tr>
                        <th>Company Name</th>
                        <th>Last Price</th>
                        <th>Change</th>
                        <th>% Change</th>
                    </tr>

                      {this.state.watchlist.map(stock => 
                      <tr 
                          key={stock.name}>
                          <td> {stock.name} </td>
                          <td className="text-center display-4"> {stock.price}</td>
                          <td> {parseInt(stock.price) - (stock.price_open)}</td>
                          <td> {1 - parseInt(stock.price_open) / (stock.price) * 100}%</td>
                    </tr>)}
                      
                
            </table>
          </div> */}
    <div className="stock-related">
        <div>
          <form className="form-inline" >
              {/* <input
                aria-label="stock-symbol"
                aria-describedby="enter-stock-symbol"
                type="text"
                placeholder="Enter a Symbol"
                value={this.state.entered}
                onChange= {this.changeHandler}
              /> */}

              <Select
                id="dropdown"
                // value={entered.value}
                // label={entered}
                onChange={this.changeHandler}
                options={options}
                placeholder="Enter a Company to View Quote"
              />

              <div className="input-group-append" />
              <button
                id="enter-button"
                // className="btn btn-secondary"
                type="button"
                onClick= {this.gettingData}
              >
                ENTER
              </button>
          </form>
        </div>
        {/* <Search /> */}

        <div className="stock-chart-width">

        {this.state.stock.price? 
        
        <table id="stock-detail">
            <tr>
              <th id="header">QUOTE</th>
             <th></th>
             <th></th>
            </tr>


            <tr >
              <td id="main-stock-name">
                  <h4><b>{this.state.stock.name} ({this.state.stock.symbol})</b></h4>
                  <h4 style={{ color: this.state.color }}> {this.state.stock.price} ({this.state.stock.change_pct}%)</h4>
                  <div syle={{width: 500}}>Last Trade Time: {this.state.stock.last_trade_time}</div>
              </td>
              <td></td>
              <td></td>
              
            </tr>
            </table>
            : null }
      {this.state.stock.price? 
      <table id="stock-detail">

            <tr id="table-row">
              <td id="table-row"><div style={{color: "grey"}}>OPEN: </div> <div>{this.state.stock.price_open}</div></td>
              <td  id="table-row" ><div style={{color: "grey"}}>   DAY CHANGE:  </div>   <div style={{ color: this.state.color }}>{this.state.stock.day_change }</div></td>
              <td  id="table-row"><div style={{color: "grey"}}>  % CHANGE: </div><div style={{ color: this.state.color }}> {this.state.stock.change_pct }% </div> </td>
            </tr>
          
            <tr id="table-row">
              <td  id="table-row" type="number"><div style={{color: "grey"}}>VOLUME: </div><div> {this.state.stock.volume}</div></td>
              <td  id="table-row" ><div style={{color: "grey"}}>AVG VOLUME: </div> <div>{this.state.stock.volume_avg}</div> </td>
              <td  id="table-row" type="number"><div style={{color: "grey"}}>SHARES: </div> <div>{this.state.stock.shares}</div></td>
            </tr>

            <tr id="table-row">
              <td id="table-row"><div style={{color: "grey"}}>DAY HIGH: </div> <div>{this.state.stock.day_high} </div></td>
              <td id="table-row"> <div style={{color: "grey"}}>DAY LOW:  </div><div>{this.state.stock.day_low } </div></td>
              <td id="table-row" type="number"><div style={{color: "grey"}}>EARNINGS PER SHARE: </div><div>{this.state.stock.eps} </div></td>
            </tr>  

          </table>
          : null }


{/* 
          <div className="card-body">
            <h6 className="text-center display-4">{this.state.stock.name} </h6>
            <h6 className="text-center display-4">{this.state.stock.symbol}</h6>
            <h6 className="text-center display-2"style={{ color: this.state.color }}>
              {this.state.stock.price && (<span>Current: </span>)}{this.state.stock.price}
            </h6>
            <h6 className="text-center display-5" style={{ color: this.state.openColor }}>
              {this.state.stock.price_open && (<span>Open: </span>)}{this.state.stock.price_open}
            </h6>

  
              <ul>
              
              </ul>
          </div> */}

          
            

            <div className="box">
              <br/>
              <br/>
              <br/>

            <Charts data={this.state.data}/>
  
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>


          {this.state.news?
            <div className="container">
              <h5>Related News</h5>
              <div className="card z-depth-0">
                <div className="card-content">
                {this.state.news && (
                      <div>
                        {this.state.news.map(story => {
                          return <News story={story} />;
                        })}
                      </div>
                )}
                </div>
              </div>
            </div>
            :null}
        </div>
        </div>
      </div>
    );
  }
}

export default Stock

// const mapStateToProps = (state) => {
//   return {
//     auth: state.firebase.auth
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     createProject: (project) => dispatch(createProject(project))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Stock)