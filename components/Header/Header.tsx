import * as React from 'react';
import {Icon} from "native-base";
import {Col} from "react-native-easy-grid";
import {View} from "react-native";


export class Header {

    static Properties = (navigation:any) => {
        return <View
        style={{
            marginLeft:20
        }}
        ><Icon name="menu" type="MaterialCommunityIcons" onPress={ () => {
                navigation.navigate('Properties')
        }} /></View>

    }

}
