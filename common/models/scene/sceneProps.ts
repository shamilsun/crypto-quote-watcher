import {ITicker} from "../ticker/tickerProps";

export interface IScene {
    tickersArray:ITicker[]
}

export enum ESceneTickerCardRender {
    Faced,
    Backward
}