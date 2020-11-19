import * as React from 'react';
import {Text, TouchableNativeFeedback, WebView,} from 'react-native';
import {IContextState} from "../App";
import {Grid, Row} from "react-native-easy-grid";
import {colors, stylesScene} from "../../styles/styles";
import {Button, View} from "native-base";
import {Header} from "../Header/Header";
import {ModalPropertiesItemRow} from "../ModalProperties/ModalPropertiesItemRow";

interface IProps {
    context?:IContextState
    navigation?: any
}


type IState = {
}

export default class AboutApp extends React.Component <IProps, Partial<IState>> {

    static navigationOptions = ({navigation}: any) => {
        return {
            title: `О приложении`,
            headerLeft: Header.Properties(navigation),
        };
    };


    constructor (props:any) {
        super(props);
        this.state = {
        }
    }

    render(): JSX.Element {
                let mRow = {uid: 1, icon: '', caption: 'Котировки', navigationScreen: 'SceneTickers'};

                return  <Grid style={stylesScene.container}>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <View style={{
                            height: "100%",
                            width: '100%',
                         //   backgroundColor: colors.mainbg,
                            justifyContent: "flex-start",
                            padding: 20
                        }}>

                            <WebView source={{html: `<h1>О приложении</h1>
<div>Как работает:</div>
<p>Приложение использует ссылку https://poloniex.com/public?command=returnTicker  (крипто биржа Poloniex) как поставщика данных о котировках (парах) и тикерах (инструментах, торгуемыхна рынке</p>        
<p>Выберите интересующий Вас тикер в верхней линии инструментов и в ответ получите на основном экране Все коррелирующие пары (прямые и обратные соотвествия, но не прокси (не арбитражное соотвествие))</p>
<p>Приложение делает silent request-ы к  ресурсы, только когда находится на экране котировок</p>
<p>Приложение обновляет визуальные контейнеры только когда данные изменяются</p>
<p>Приложение отражает дату пследнего успешого взаимодейсвия с поставщиком данных</p>
<p>Приложение отражает состояние ошибки, если данные не могут быть получены через сеть или невалидные</p>
<p>Приложение даёт пользователю возможность получать больше информации о тикеер если он нажмет на него (увидит последний хай бид и процент изменения)</p>
<p>Приложение показывает визуально статус пары (растёт или падает)</p>
<p>Приложение имеет экран "О Приложении" с описанием программы</p>
`}} />
                            <View>
                                <ModalPropertiesItemRow handleClick={()=>{
                                    this.props.navigation.navigate(mRow.navigationScreen,
                                        {
                                            onGoBack: () => console.log('Will go back from nextComponent'),
                                        })

                                }} menurow={mRow}></ModalPropertiesItemRow>
                            </View>

                        </View>
                    </View>

                </Grid>
    }
}
