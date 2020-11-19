import * as React from 'react';
import {Easing, Text, TouchableOpacity, View} from 'react-native';
import {colors, stylesWord} from "../../styles/styles";
import {TickerClass} from "../../common/models/ticker/tickerClass";
import {SceneClass} from "../../common/models/scene/sceneClass";

interface IProps {
    ticker:TickerClass
}

interface IState {

}

export class TickerSmall extends React.Component <IProps, Partial<IState>> {

    constructor(props: any) {
        super(props);
        this.state = {

        };
        this.onClick = this.onClick.bind(this)
    }


    onClick () {
        SceneClass.setToTicker(this.props.ticker.getTickerName())
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        // if (this.state.onlineOpacity != nextState.onlineOpacity) {
        //     return true
        // }

        if (!this.props.ticker.isVisible()) {
            return false
        }

        return false
    }

    render() {

        let style = stylesWord.container as any;


        return <TouchableOpacity style={[style, {
        }]}
            onPress={this.onClick}
        >
            <View style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.yellowBgWoordCard,
                borderRadius: 2,
                flex: 1
            }}>
                <Text style={[stylesWord.textLabel3,]}>
                    {this.props.ticker.getTickerName()}
                </Text>
            </View>
        </TouchableOpacity>
    }

}

