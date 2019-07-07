import React, {Component} from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import CandleChart from '../../Utils/CandleChart';
import {url} from "../../Network/URL";

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showWindow: this.props.window,
            chartData: this.props.data
        }
    }

    openCandleStickChart(){
        window.open(url.own.base+url.own.candle_chart(this.props.pair.from,this.props.pair.to))
    }

    render() {
        // console.log(this.props.window)
        return (
            <Card style={{flex: 1, marginLeft: 12, marginRight: 12}}>
                {this.state.chartData.length>0?<CandleChart className='pointer' height={200} windowFrame={this.state.showWindow} data={this.state.chartData} zoom={false} pan={false} onClick={()=>this.openCandleStickChart()}/>:''}
                <Card.Content>
                    <Card.Header>{this.props.pair.from} - {this.props.pair.to}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <b>Open : </b> {this.state.chartData[199].open} <br/>
                        <b>High : </b> {this.state.chartData[199].high} <br/>
                        <b>Low : </b> {this.state.chartData[199].low} <br/>
                        <b>Close : </b> {this.state.chartData[199].close}
                    </a>
                </Card.Content>
            </Card>
        );
    }
}

export default SearchResults
