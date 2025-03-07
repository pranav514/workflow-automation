export interface Zap {
    "id" : string,
    "triggerId" : string,
    "userId" : string,
    "actions" : {
        "id" : string,
        "zapiId" : string,
        "actionId" : string,
        "sortingOrder" : number,
        "type" : {
            "id" : string,
            "name" : string
            "image" : string
        }
    }[],
    "trigger" : {
        "id" : string,
        "zapId" : string,
        "triggerId" : string,
        "type" : {
            "id" : string,
            "name" : string
            "image" : string
        }
    }
}