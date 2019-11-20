import React from 'react';
import Chart from './Chart';
import AreaChart from './AreaChart'
import { TypeChooser } from "react-stockcharts/lib/helper";
import './chart.css';



class Charts extends React.Component {


    state={
        clicked: true,
        default: false,
        areaChartName: "Switch to Area Chart",
        emaChartName: "Switch to EMA Chart"
    }

    clickHandler= (e) => {
        // console.log("Chart type clicked")
        e.preventDefault()
        this.setState({
            clicked: !this.state.clicked,
            default: !this.state.default,
            chatName: "EMA Details"
        })
    }

    render() {
        if (this.props.data == null) {
            return <div><h2></h2></div>
        }
        // console.log("STATE", this.state)
        return (
            
         <div>
            <button id="enter-button" onClick={this.clickHandler}>
                {this.state.clicked? <div>{this.state.emaChartName}</div> : <div>{this.state.areaChartName}</div>}
            </button>
            {this.state.clicked?  
            <TypeChooser>
                {type => <AreaChart type={type} data={this.props.data} />}
            </TypeChooser> : null}
            {this.state.default? <TypeChooser>
                {type => <Chart type={type} data={this.props.data} />}
            </TypeChooser> : null}
         </div>
                // <TypeChooser>

                // {type => <AreaChart type={type} data={this.props.data} />}
                // </TypeChooser>
     
            
        )
    }
}
 export default Charts;


