import Interactor from './Interactor'

class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }
    setStrategyData(data){
        var list=[]
        for(var i=0; i<Object.keys(data).length; i++){
            const key = Object.keys(data)[i]
            const item = Object.values(data)[i]
            const timeFrame = key.split(":")[1]
            const pairKey = key.split(":").pop()
            const pair = { from: pairKey.substr( 1, pairKey.length - 4 ), to: pairKey.substr( pairKey.length -3, pairKey.length )}
            list.push({
                item: item,
                timeFrame: timeFrame,
                pair: pair
            })
        }
        this.script.strategyData = list
        this.script.setState({
            chartData:list
        })
    }
    setChartData(data, showWindow){
        var list=[]
        for(var i=0;i<data.length;i++){
            list.push({
                time: data[i][0],
                open: data[i][1],
                close: data[i][2],
                high: data[i][3],
                low: data[i][4],
                volume: data[i][5],
            })
        }
        this.script.setState({
            chartData:list,
            showWindow:showWindow
        })
    }

    setSelectedKey( name, from, to, window, pairData ){
        // this.script.setSelection( name, from, to, window, pairData )
        this.stopLoading()
    }
    startLoading(){
        this.script.setState({
            isLoading:true,
        })   
    }
    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }

}
export default Presenter