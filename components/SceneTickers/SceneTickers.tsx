import * as React from 'react';
import {ImageBackground, View,} from 'react-native';
import {IContextState} from "../App";
import {Col, Grid, Row} from "react-native-easy-grid";
import {colors, stylesScene} from "../../styles/styles";
import RnWaitDiv from "../Helpers/RnWaitDiv";
import {DataPoolClass} from "../../common/models/dataPool/dataPoolClass";
import {IScene} from "../../common/models/scene/sceneProps";
import {Ticker} from "../Ticker/Ticker";
import {TickerClass} from "../../common/models/ticker/tickerClass";
import {ESceneEvents} from "../../common/models/dataPool/dataPoolProps";
import {Content} from "native-base";
import {Header} from "../Header/Header";
import {SceneTickersLine} from "./SceneTickersLine";
import {SceneClass} from "../../common/models/scene/sceneClass";
import {SceneError} from "./SceneError.";

interface IProps {
    context?:IContextState
}


type IState = {
    //tab:EWindow
    scene:IScene

}

export class SceneTickers extends React.Component <IProps, Partial<IState>> {

    static navigationOptions = ({navigation}: any) => {
        return {
            title: `Котировки`,
          //  headerLeft: Header.Properties(navigation),
        };
    };

    constructor (props:any) {
        super(props);
        this.state = {
        }

        DataPoolClass.setTouchEvent(ESceneEvents.NewTickersAdded, ()=>{
            this.forceUpdate()
        })

        DataPoolClass.setTouchEvent(ESceneEvents.TickersLoaded, ()=>{
            this.forceUpdate()
        })

        DataPoolClass.setTouchEvent(ESceneEvents.onScenePairsMatched, ()=>{
            this.forceUpdate()
        })

        SceneClass.setTouchEvent(ESceneEvents.onSceneChangedToPair, ()=>{
            this.forceUpdate()
        })
    }

    private getTickerComponent  (t: TickerClass) {
        // if (1==1) {
        //     return null
        // }
        if (!t) {
            return null
        }
        if (!t.getState()?.reactComponent) {
            t.getState().reactComponent = <Ticker ticker={t} />
        }
        return t.getState().reactComponent
    }

    componentDidMount(): void {
      //  setTimeout(()=>this.setState({tab: EWindow.Open}), 1000);
        DataPoolClass.startWatching()
    }

    componentWillUnmount(): void {
        console.log('x84 off session')
        DataPoolClass.stopWatching()
    }

    render() {

        const renderContent = () => {

            console.log('DataPoolClass.isHaveTickersForShow()',DataPoolClass.isHaveTickersForShow())
            if (!DataPoolClass.isHaveTickersForShow()) {
                return <RnWaitDiv/>
            }

            let tickersArray = Object.values(DataPoolClass.getTickers()).filter(v=>{
                return v.isHavePairTo(SceneClass.getToTicker())
            });

            return <Content style={{
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: 'wrap',
                }}>
                    {tickersArray.map((v: TickerClass, i: number) => {
                        return <View style={{
                            height: 100,
                            width: 180,
                        //    backgroundColor: 'red',
                        }} key={`${v.getTickerName()}`}>{this.getTickerComponent(v)}</View>
                    })}
                </View>
            </Content>
        };

        return <Grid style={stylesScene.container}>

            <ImageBackground source={{uri: 'https://a.rgbimg.com/users/s/su/sundesigns/600/meT5VCO.jpg'}}
                             style={{
                                 flex: 1,
                             }}
                             resizeMode={'cover'}
            >
                {DataPoolClass.isHaveTickersForShow() ?
                <SceneTickersLine />
                    : null}
                    <SceneError />
                {
                    renderContent()
                }
            </ImageBackground>
        </Grid>
    }
}
