import * as React from 'react';
import {ImageBackground, ScrollView, Text, View,} from 'react-native';
import {IContextState} from "../App";
import {ESceneEvents} from "../../common/models/dataPool/dataPoolProps";
import {stylesWord} from "../../styles/styles";
import {SceneClass} from "../../common/models/scene/sceneClass";

interface IProps {
    context?:IContextState
}


type IState = {
    error:string
}

export class SceneError extends React.Component <IProps, Partial<IState>> {


    constructor (props:any) {
        super(props);
        this.state = {
            error:''
        }

        SceneClass.setTouchEvent(ESceneEvents.onError, (v:any)=>{
            this.setState({
                error:v[0]
            })
        })


    }


    render() {

        return <View style={{
            height:40,
            width:"100%",
            backgroundColor: '#ffffff90'
        }}>
            <Text style={[stylesWord.textLabel3,]}>{this.state.error}</Text>
        </View>
    }
}

