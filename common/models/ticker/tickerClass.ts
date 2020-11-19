import {ETickerEvents,  ITicker, ITickersStack} from "./tickerProps";
import {DataPoolClass} from "../dataPool/dataPoolClass";
import {SceneClass} from "../scene/sceneClass";
import {IToPair, IToPairsStack} from "../tickersPair/tickersPairProps";
import {HelpersClass} from "../helpers/helpersClass";
import {ESceneEvents} from "../dataPool/dataPoolProps";
import {IEventsStack} from "../events/eventsProps";

export class TickerClass {

    private state: ITicker;
    private onEvents: IEventsStack = {};

    private localPairs: IToPairsStack = {}

    constructor(v: ITicker) {
        this.state = v;
        this.updatePairTo = this.updatePairTo.bind(this)
        this.isHavePairTo = this.isHavePairTo.bind(this)
    }

    public isHavePairTo(v:string) {
        return !HelpersClass.isEmpty(this.localPairs[v])
    }

    public getToPairData(f:string,toPair:IToPair):number {
        let examValue = null;
        if (toPair) {
            examValue= toPair.pair?.getState()[f]
            if (toPair.inverse) {
                examValue = 1/examValue
            }
        }
        return examValue
    }
    public updatePairTo(toTicker:TickerClass, toPair:IToPair) {

        let redrawScene = false;

        if (!this.isHavePairTo(SceneClass.getToTicker())) {
            if (toTicker.getTickerName() == SceneClass.getToTicker()) {
                redrawScene = true;
            }
        }
        this.localPairs[toTicker.getTickerName()] = toPair;


        if (redrawScene) {
            DataPoolClass.touchEventsPool(ESceneEvents.onScenePairsMatched)
        }

        console.log('SceneClass.getToTicker()',SceneClass.getToTicker());

        if (SceneClass.getToTicker() == toTicker.getTickerName()) {
            this.touchEvents(ETickerEvents.onTickerPairUpdate,null, toPair)
        } else {
//          this.touchEvents(ETickerEvents.onTickerPairUpdate, null)
        }

    }

    public isVisible() {
        return true;
        //return this.state.isVisible
    }
    public setVisible(v:boolean) {
        if (this.state.isVisible == v) {
            return
        }
        console.log('x99', v, this.getTickerName())
        this.state.isVisible = v
    }

    public getState() {
        return this.state
    }
    public update() {
        this.touchEvents(ETickerEvents.Updated)
    }

    public getTickerName(): string {
        return this.state.title
    }

    public setOnEvents(v: ETickerEvents, f: any, setterKey:string=null) {
        if (!this.onEvents[v]) {
            this.onEvents[v] = []
        }
        this.onEvents[v].push({
            setterKey:setterKey,
            event:f
        })
    }

    public touchEvents(v: ETickerEvents,setterKey:string=null, ...arr: any) {
        if (!this.onEvents) {
            console.log('events pool not found')
            return
        }
        console.log('x85,start', );

        let events = this.onEvents[v];
        console.log('x85,start2', events?.length);

        if (events?.length) {
            events.forEach(v=>{
                if (setterKey) {
                    if (setterKey == v.setterKey) {
                        v.event(arr)
                    }
                } else {
                    v.event(arr)
                }
            })
        }
    }

    static getTickerFromStackByTickerName(v: string, stack: ITickersStack): TickerClass {
        if (HelpersClass.isEmpty(stack)) {
            return null
        }
        return stack[v]
    }

    static isHaveTickerInStackByTickerName(v: string, stack: ITickersStack): boolean {
        return !!this.getTickerFromStackByTickerName(v,stack)
    }
}