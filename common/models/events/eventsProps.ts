
export interface IEventsStack {
   [actionKey:string]: {
       setterKey:string
       event: (arr:any)=>void
   }[]

}