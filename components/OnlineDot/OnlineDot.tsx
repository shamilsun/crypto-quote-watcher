import * as React from 'react';
import {Icon, View} from "native-base";
import {TickerClass} from "../../common/models/ticker/tickerClass";
import {ETickerEvents} from "../../common/models/ticker/tickerProps";

interface IProps {
    ticker:TickerClass
}


type IState = {
    isOnline:boolean
}

export class OnlineDot extends React.Component <IProps, Partial<IState>> {

    constructor (props:any) {
        super(props);
        this.state = {
            isOnline:false
        }

        this.props.ticker.setOnEvents(ETickerEvents.onOnline,this.onTickerUpdate.bind(this))
    }

    componentDidMount(): void {
        this.onTickerUpdate()

    }


    private watcher:any
    private onTickerUpdate() {

            if (this.watcher) {
                clearTimeout(this.watcher)
            }

            this.watcher = setTimeout(()=>{
                this.setState({
                    isOnline : false
                })
            },3000)

        if (!this.state.isOnline) {
            this.setState({
                isOnline: true
            })
        }

    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {

        if (!this.props.ticker.isVisible()) {
            return false
        }
        if (this.state.isOnline != nextState.isOnline) {
            return true
        }

        return false
    }

    render(): JSX.Element {
        return <View style={{
            width:20,
            height:20,
            position:'absolute',
            right:3,
            bottom:3,
            flex:1,
//            opacity:this.state.onlineOpacity ,//(this.state.animOnlineVal as any).__getValue() , //this.state.onlineOpacity, //(this.state.animOnlineVal as any)._value, //
//                backgroundColor:'red',
            justifyContent:'center',
            alignItems:'center'

        }}>
            {this.state.isOnline ?
                <Icon name="cloud" type="Ionicons"
                      style={{
                          fontSize: 20,
                          color: 'green',
                      }}
                />
                :
                <Icon name="cloud-offline" type="Ionicons"
                      style={{
                          fontSize: 20,
                          color: 'black',
                      }}
                />
            }
        </View>
    }
}

