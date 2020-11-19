import * as React from 'react';
import {withAppContext} from "../Helpers/AppContextHelper";
import {IContextState} from "../App";
import {Grid} from "react-native-easy-grid";
import {Spinner} from "native-base";
import {colors, stylesScene} from "../../styles/styles";

interface IProps {
    context?:IContextState
}


type IState = {
}

class RnWaitDiv extends React.Component <IProps, Partial<IState>> {

    constructor (props:any) {
        super(props);
        this.state = {
        }
    }

    render(): JSX.Element {
                return  <Grid style={{
                    width:'100%',
                    height:'100%',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor: colors.bglightblue,
                    opacity:.7
                }}>
                    <Spinner color='cornflowerblue' />
                </Grid>
    }
}

export default withAppContext(RnWaitDiv)

