import {AppContext} from "../storeContext";
import * as React from 'react';

export const withAppContext = (Component:any):any => {

    return class RouterWillRun extends React.Component {

        static navigationOptions = Component.navigationOptions;

        render() {
            return <AppContext.Consumer>
                {(context: any) => {
                    return <Component {...this.props} context={context}/>
                }}
            </AppContext.Consumer>
        }
    };
};

