import * as React from 'react';
import {Image, ImageBackground, Text,} from 'react-native';
import {IContextState} from "../App";
import {Col, Grid, Row} from "react-native-easy-grid";
import {stylesScene} from "../../styles/styles";

interface IProps {
    context?: IContextState
}


type IState = {}

export default class AppLoading extends React.Component <IProps, Partial<IState>> {

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render(): JSX.Element {
        return <Grid>
            <Row style={stylesScene.container}>
                <Col style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image style={{flex: 1, height: '100%', width: '100%', margin: 3}}
                           source={require('../../assets/logo.png')}
                           resizeMode={'contain'}/>
                </Col>
            </Row>

        </Grid>
    }
}

