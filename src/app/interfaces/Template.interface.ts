import {Test} from '../interfaces/Test.interface'

export interface Template{
    _id?:string,
    name:string,
    code?:string,
    method:string,
    selected?:boolean,
    data:Test[]
}
