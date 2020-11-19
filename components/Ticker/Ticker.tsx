import * as React from 'react';
import {Easing, Text, TouchableOpacity, View} from 'react-native';
import {colors, stylesWord} from "../../styles/styles";
import {Col, Content, Icon} from "native-base";
import {ETickerEvents} from "../../common/models/ticker/tickerProps";
import {ESceneTickerCardRender} from "../../common/models/scene/sceneProps";
import {TickerClass} from "../../common/models/ticker/tickerClass";
import {OnlineDot} from "../OnlineDot/OnlineDot";
import {Quote} from "../Quote/Quote";
import {Grid, Row} from "react-native-easy-grid";
import {IToPair} from "../../common/models/tickersPair/tickersPairProps";
import {SceneClass} from "../../common/models/scene/sceneClass";

interface IProps {
    ticker:TickerClass
}

interface IState {
    side: ESceneTickerCardRender
    highestBid:number,
    percentChange:number,
}

export class Ticker extends React.Component <IProps, Partial<IState>> {

    constructor(props: any) {
        super(props);
        this.state = {
            side:ESceneTickerCardRender.Faced,
        };
        this.triggerSide = this.triggerSide.bind(this)
        this.props.ticker.setOnEvents(ETickerEvents.onTickerPairUpdate,this.onTickerPairUpdate.bind(this))
    }
    private onTickerPairUpdate(arr:any) {
        let newPair : IToPair = arr[0];
        let highestBid = this.props.ticker.getToPairData('highestBid',newPair)
        let percentChange = 100*this.props.ticker.getToPairData('percentChange',newPair)
        this.setState({
            highestBid:highestBid,
            percentChange:percentChange,
        })
    }

    triggerSide () {
        let newSide = this.state.side ==ESceneTickerCardRender.Faced? ESceneTickerCardRender.Backward : ESceneTickerCardRender.Faced
        this.setState({
            side:newSide
        })
    }

    tickerFrontView() {
        return <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            //margin:3,
            backgroundColor: colors.yellowBgWoordCard,
            borderRadius: 2,
            flex: 1
        }}>
            <Text style={[stylesWord.textLabel1,]}>
                {SceneClass.getToTicker()}/{this.props.ticker.getTickerName()}
            </Text>
        </View>
    };


    tickerBackView () {
        return <View style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            //margin:3,
            backgroundColor: '#CFEAAD',//colors.yellowBgWoordCard,
            borderRadius: 2,
            flex: 1,
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 20,
        }}>
            <Content>
                <Grid>
                    <Row>
                        <Col>
                            <Text>мах Бид</Text>
                        </Col>
                        <Col>
                            <Text>   {this.state.highestBid ? this.state.highestBid.toFixed(2): 'N/A'}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text>% изм</Text>
                        </Col>
                        <Col>
                            <Text> {this.state.percentChange ? this.state.percentChange.toFixed(2): 'N/A'}</Text>
                        </Col>
                    </Row>

                </Grid>
            </Content>
        </View>

    }


    shouldComponentUpdate(nextProps: IProps, nextState: IState) {

        if (!this.props.ticker.isVisible()) {
            return false
        }

        if (this.state.side != nextState.side) {
            console.log('shouldComponentUpdate true')
            return true
        }
        if (this.state.highestBid != nextState.highestBid) {
            console.log('shouldComponentUpdate true')
            return true
        }
        if (this.state.percentChange != nextState.percentChange) {
            console.log('shouldComponentUpdate true')
            return true
        }

        console.log('shouldComponentUpdate false')
        return false
    }

    render() {

        let style = stylesWord.container as any;
        return <TouchableOpacity style={[style, {
        }]}
            onPress={this.triggerSide}
        >
            {
                this.state.side == ESceneTickerCardRender.Faced ?
                this.tickerFrontView() :
                    this.tickerBackView()
            }
            <Quote ticker={this.props.ticker} />
            <OnlineDot ticker={this.props.ticker} />
        </TouchableOpacity>
    }

}

