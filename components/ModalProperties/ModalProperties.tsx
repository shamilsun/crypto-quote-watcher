import * as React from 'react';
import {FlatList, View,} from 'react-native';
import {IContextState} from "../App";
import {colors, stylesTypeSelector} from "../../styles/styles";
import {ModalPropertiesItemRow} from "./ModalPropertiesItemRow";
import { StackActions, NavigationActions } from "react-navigation";

interface IProps {
    context?: IContextState
    navigation?: any
}


type IState = {
    menu: IModalPropertyMenuRow[]
}


export interface IModalPropertyMenuRow {
    uid: number,
    icon: string,
    caption: string,
    navigationScreen: string,
}

export class ModalProperties extends React.Component <IProps, Partial<IState>> {

    static navigationOptions = (nav: any) => {
        const {state} = nav.navigation;
        return {
            title: `Меню`,
            headerMode: 'none',
            transparentCard: true,
            cardStyle: {
                backgroundColor: 'transparent',
                opacity: 1,// .99,
            },
            transitionConfig: () => ({
                containerStyle: {
                    backgroundColor: 'transparent',
                }
            }),
        };
    };

    constructor(props: any) {
        super(props);
        this.state = {
            menu: [
                {uid: 1, icon: '', caption: 'О приложении', navigationScreen: 'AboutApp'},
                {uid: 2, icon: '', caption: 'Котировки', navigationScreen: 'SceneTickers'},
            ]
        };
    }

    goTo(v: string) {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: v,
                         onGoBack: () => console.log('Will go back from nextComponent x84'),
                })],
        });

        this.props.navigation.dispatch(navigateAction);
    }

    render(): JSX.Element {
        return <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <View style={{
                height: "100%",
                width: '80%',
                backgroundColor: colors.mainbg,
                justifyContent: "flex-start",
                padding: 20
            }}>
                <FlatList
                    style={[stylesTypeSelector.container, {
                        height: '100%'
                    }]}
                    data={this.state.menu}
                    extraData={this.state.menu}
                    renderItem={({item}) => {
                        return <ModalPropertiesItemRow menurow={item} handleClick={() => {

                            this.props.navigation.navigate(item.navigationScreen,
                                {
                                    onGoBack: () => console.log('Will go back from nextComponent'),
                                })

                        }}/>
                    }}
                    keyExtractor={item => item.uid.toString()}
                />
            </View>
        </View>
    }
}