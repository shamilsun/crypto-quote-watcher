import * as React from 'react';
import {ImageBackground, ScrollView, View,} from 'react-native';
import {IContextState} from "../App";
import RnWaitDiv from "../Helpers/RnWaitDiv";
import {DataPoolClass} from "../../common/models/dataPool/dataPoolClass";
import {IScene} from "../../common/models/scene/sceneProps";
import {TickerClass} from "../../common/models/ticker/tickerClass";
import {ESceneEvents} from "../../common/models/dataPool/dataPoolProps";
import {TickerSmall} from "../Ticker/TickerSmall";
import {SceneClass} from "../../common/models/scene/sceneClass";

interface IProps {
    context?: IContextState
}


type IState = {
    //tab:EWindow
    scene: IScene

}

export class SceneTickersLine extends React.Component <IProps, Partial<IState>> {


    constructor(props: any) {
        super(props);
        this.state = {}

        DataPoolClass.setTouchEvent(ESceneEvents.NewTickersAdded, () => {
            this.forceUpdate()
        })

        DataPoolClass.setTouchEvent(ESceneEvents.TickersLoaded, () => {
            this.forceUpdate()
        })

    }

    private getTickerComponent(t: TickerClass) {
        if (!t) {
            return null
        }
        if (!t.getState()?.reactComponentSmallTIcker) {
            t.getState().reactComponentSmallTIcker = <TickerSmall ticker={t} key={t.getTickerName()}/>
        }
        return t.getState().reactComponentSmallTIcker
    }

    render() {

        const renderContent = () => {

            if (!DataPoolClass.isHaveTickersForShow()) {
                return <RnWaitDiv/>
            }

            let tickersArray = DataPoolClass.getTickers();
            return <ScrollView
                horizontal={true}
            >{
                Object.values(tickersArray).map((v: TickerClass, i: number) => {
                    return <View style={{
                        height: '100%',
                        width: 80,
                        opacity: v.getTickerName() == SceneClass.getToTicker() ? 1 : 0.4,
                    }} key={`${v.getTickerName()}`}>{this.getTickerComponent(v)}</View>
                })
            }

            </ScrollView>
        }
        return <View style={{
            height: 40,
            width: "100%",
            backgroundColor: '#ffffff90'
        }}>
            {
                renderContent()
            }
        </View>
    }
}

