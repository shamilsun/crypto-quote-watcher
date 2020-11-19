import * as React from 'react';
import {Button, Icon, View} from "native-base";
import {TickerClass} from "../../common/models/ticker/tickerClass";
import {Animated, Easing, Text} from "react-native";
import {ETickerEvents} from "../../common/models/ticker/tickerProps";
import {stylesWord} from "../../styles/styles";
import {IToPair} from "../../common/models/tickersPair/tickersPairProps";


interface IProps {
    ticker:TickerClass
}


type IState = {
    last:number,
    percentChange:number,
}

export class Quote extends React.Component <IProps, Partial<IState>> {

    constructor (props:any) {
        super(props);
        this.state = {
            last:null,
            percentChange:null,
        }

        this.props.ticker.setOnEvents(ETickerEvents.onTickerPairUpdate,this.onTickerPairUpdate.bind(this))
    }

    private onTickerPairUpdate(arr:any) {
        let newPair : IToPair = arr[0];
        let last = this.props.ticker.getToPairData('last',newPair)
        let percentChange = this.props.ticker.getToPairData('percentChange',newPair)
        this.setState({
            last:last,
             percentChange:percentChange,
        })
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {

        if (!this.props.ticker.isVisible()) {
            return false
        }


        if (this.state.percentChange != nextState.percentChange) {
            return true
        }

        if (this.state.last != nextState.last) {
            return true
        }
        return false;
    }

    render(): JSX.Element {
        let background = {backgroundColor: '#08d50c'}
        if (this.state.percentChange<0) {
            background.backgroundColor = "red"
        }
        return <View style={[{
            width:"100%",
            //height:80,
            position:'absolute',
            //right:"50%",
            bottom:0,
            flex:1,
            justifyContent:'center',
            alignItems:'center',


        },background]}>
            <Text style={[stylesWord.textLabel2,]}>
                {this.state.last ? this.state.last.toFixed(2): 'N/A'}
            </Text>
        </View>

    }
}

