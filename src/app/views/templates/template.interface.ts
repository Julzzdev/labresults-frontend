export interface Template{
    name:string,
    code:string,
    fields:Field[]
}

 export interface Field{
    name:string,
    unity:string,
    value:string
}