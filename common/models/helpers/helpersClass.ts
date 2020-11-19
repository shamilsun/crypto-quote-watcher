export class HelpersClass {
    static isEmpty(obj: any) {
        if (!obj) {
            return true
        }
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    static formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
}