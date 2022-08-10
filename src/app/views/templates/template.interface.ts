export interface Template{
    name:string,
    code:string,
    fields:Field[]
}

 interface Field{
    name:string,
    unity:string,
    value:string
}