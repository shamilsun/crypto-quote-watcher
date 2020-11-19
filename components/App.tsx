import * as React from 'react';
import {AppContext} from "./storeContext";
import AppLoading from "./AppLoading/AppLoading";
import {EWindow} from "../common/models/helpers/helpersProps";
import {RootStack} from "./navigationStack";

interface IProps {
    navigation?: any
}


export interface IContextState {
    tab: EWindow,
}

export default class App extends React.Component <IProps, Partial<IContextState>> {


    constructor(props: any) {
        super(props);

        this.state = {
            tab: EWindow.Wait,
        };
    }

    checkIsLoaded() {
        //мог бы и тут загрузить котировки и сверять но не стал ибо тогда я не смог бы показать спиннер на странице "котировки"
        setTimeout(()=>this.setState({tab: EWindow.Open}), 1000);
    }

    componentDidMount() {

        this.checkIsLoaded();
    }


    render() {
        if (this.state.tab == EWindow.Wait) {
            return <AppLoading/>;
        }

        return <AppContext.Provider value={this.state}>
            <RootStack/>
        </AppContext.Provider>
    }
}
