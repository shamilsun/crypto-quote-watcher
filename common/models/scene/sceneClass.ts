import {ESceneEvents, IEventsPool} from "../dataPool/dataPoolProps";

export class SceneClass {

    static toTicker : string = 'BTC'
    private static eventsPool:IEventsPool = {}

    static setToTicker(v:string) {
        if (v==this.toTicker) {
            return
        }
        this.toTicker = v
        this.touchEventsPool(ESceneEvents.onSceneChangedToPair)
    }
    static touchEventsPool(v:ESceneEvents, ...arr:any) {
        if (!this.eventsPool) {
            console.log('events pool not found')
            return
        }
        let event = this.eventsPool[v] as any;
        if (event) {
            event(arr)
        }
    }

    static setTouchEvent(v:ESceneEvents,f:any) {
        this.eventsPool[v] = f
    }

    static getToTicker():string {
        return this.toTicker
    }
}