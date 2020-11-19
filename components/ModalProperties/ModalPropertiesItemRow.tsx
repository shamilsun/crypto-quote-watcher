import * as React from 'react';
import {
    ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, TouchableHighlight,
    TouchableWithoutFeedback, FlatList,
} from 'react-native';
import {IContextState} from "../App";
import {Col, Grid, Row} from "react-native-easy-grid";
import {colors, stylesScene} from "../../styles/styles";
import {IModalPropertyMenuRow} from "./ModalProperties";

interface IProps {
    context?:IContextState
    //language:ILanguage
    handleClick: ()=>void
    menurow:IModalPropertyMenuRow
}


type IState = {
    //checked:boolean
}

export class ModalPropertiesItemRow extends React.Component<IProps, Partial<IState>> {

    props:IProps;
    state:IState;

    constructor (props:any) {
        super(props);
        this.state = {
        };
    }

    shouldComponentUpdate (nextProps:IProps, nextState:IState) {
        return true;
    }


    render (): JSX.Element  {
        const content =()=> {

                return <Row><Col style={{
                    width:'100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //borderRadius:0,
                   // padding:0,
                   // margin:0,
                }}>
                    <Text style={{
                        color:'#124994',
                        fontSize:18
                    }}>{this.props.menurow.caption}</Text>
                </Col>
                </Row>

            }

        return    <Row style={ {
            height:70,
            //flex: 1,
            //flexDirection: 'row',
            alignItems: 'center',
            //padding: 5,
            margin:5,
            borderRadius:5,
            //borderWidth: 2,
            //borderColor: '#cccccc',
            backgroundColor: colors.bglightblue2,

        }}><TouchableNativeFeedback onPress={this.props.handleClick}
        >
            <Grid style={{
                padding:0,
                margin:0,

            }}>
                {content()}
            </Grid>

        </TouchableNativeFeedback>
        </Row>
    }

}

