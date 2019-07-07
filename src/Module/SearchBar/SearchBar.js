import React, {Component} from 'react'
import {Dropdown, Button, Grid} from 'semantic-ui-react'
import SearchResults from './SearchResults'

const trendOptions = [
    {key: 'Uptrend', value: 'Uptrend', text: 'Uptrend'},
    {key: 'Downtrend', value: 'Downtrend', text: 'Downtrend'},
    {key: 'Consolidated', value: 'Consolidated', text: 'Consolidated'},
]

const strategyOptions = [
    {key: 'dt', value: 'Double Top', text: 'Double Top'},
    {key: 'db', value: 'Double Bottom', text: 'Double Bottom'},
    {key: 'bab', value: 'Bullish Abandoned Baby', text: 'Bullish Abandoned Baby'},
    {key: 'tws', value: 'Three White Soldiers', text: 'Three White Soldiers'},
    {key: 'tbc', value: 'Three Black Crows', text: 'Three Black Crows'},
    {key: 'ss', value: 'Shooting Star', text: 'Shooting Star'},
    {key: 'ms', value: 'Morning Star', text: 'Morning Star'},
    {key: 'es', value: 'Evening Star', text: 'Evening Star'},
]

const timeFrameOptions = [
    // {key: '1', value: '1m', text: '1 Minute'},
    // {key: '3', value: '3m', text: '3 Minutes'},
    {key: '5', value: '5m', text: '5 Minutes'},
    // {key: '15', value: '15m', text: '15 Minutes'},
    {key: '30', value: '30m', text: '30 Minutes'},
    {key: '60', value: '1h', text: '1 Hour'},
    {key: '120', value: '2h', text: '2 Hours'},
    {key: '180', value: '3h', text: '3 Hours'},
    // {key: '240', value: '4h', text: '4 Hours'},
    {key: '360', value: '6h', text: '6 Hours'},
    // {key: '480', value: '8h', text: '8 Hours'},
    {key: '720', value: '12h', text: '12 Hours'},
    {key: '1440', value: '1d', text: '1 Day'},
    // {key: '4320', value: '3d', text: '3 Days'},
]

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curr_strategy: null,
            curr_trend: null,
            curr_timeFrame: null,
        }
    }

    onStrategyChange = (e, data) => {
        this.setState({curr_strategy: data.value});
        console.log(this.props.data)
    }

    onTrendChange = (e, data) => {
        this.setState({curr_trend: data.value});
    }

    onTimeFrameChange = (e, data) => {
        this.setState({curr_timeFrame: data.value});
    }

    setChartData(data) {
        var list = []
        for (var i = 0; i < data.length; i++) {
            list.push({
                time: data[i][0],
                open: data[i][1],
                close: data[i][2],
                high: data[i][3],
                low: data[i][4],
                volume: data[i][5],
            })
        }
        return list;
    }

    render() {
        const {curr_strategy, curr_trend, curr_timeFrame} = this.state;
        return (
            <Grid columns='equal' padded='vertically'>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Select Strategy'
                            fluid
                            search
                            selection
                            options={strategyOptions}
                            value={curr_strategy}
                            onChange={this.onStrategyChange}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Select Trend'
                            fluid
                            search
                            selection
                            options={trendOptions}
                            value={curr_trend}
                            onChange={this.onTrendChange}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Select Time Frame'
                            fluid
                            search
                            selection
                            options={timeFrameOptions}
                            value={curr_timeFrame}
                            onChange={this.onTimeFrameChange}
                        />
                    </Grid.Column>
                </Grid.Row>
                { //trade:5m:tIOTETH
                    this.props.data.map( obj => {
                        const isStrategySelected = this.state.curr_strategy && obj.item.Strategies[ obj.item.Strategies.length -1 ] === this.state.curr_strategy
                        const isTimeFrameSelected = this.state.curr_timeFrame && obj.timeFrame === this.state.curr_timeFrame
                        const isTrendSelected = this.state.curr_trend && obj.item.Trend === this.state.curr_trend

                        if( isStrategySelected && isTimeFrameSelected && isTrendSelected ) {
                            return (
                                <SearchResults style={{justifyContent:'space-between'}} pair={ obj.pair } window={ obj.timeFrame }
                                               data={this.setChartData( obj.item.data )}/>
                            )
                        }
                    })
                }
                {/*{*/}
                    {/*this.props.data.map(strategy => {*/}
                        {/*if (strategy.name === curr_strategy) {*/}
                            {/*return strategy.pairs.map(pair => {*/}
                                {/*return pair.window.map(window => {*/}
                                    {/*if (window === curr_timeFrame) {*/}
                                        {/*return (*/}
                                            {/*<SearchResults style={{justifyContent:'space-between'}} pair={pair} window={window}*/}
                                                           {/*data={this.setChartData(pair[window])}/>*/}
                                        {/*)*/}
                                    {/*}*/}
                                {/*})*/}
                            {/*})*/}
                        {/*}*/}
                    {/*})*/}
                {/*}*/}
            </Grid>
        );
    }
}

export default SearchBar
