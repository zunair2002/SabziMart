//declare global variables here
//connection ko globally declare kr rhy 

import { Connection } from "mongoose"

declare global{
    var mongoose:{
    //ya tu connection howa howa ya ho rha 
        conn:Connection|null,
        promise:Promise<Connection>|null
    }
}
export {}