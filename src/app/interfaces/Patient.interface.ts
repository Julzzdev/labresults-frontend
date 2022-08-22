import { Template } from '../interfaces/Template.interface'
export interface Patient { 
    firstname: string,
    lastname1: string,
    lastname2: string,
    age: number,
    dateOfBirth: string,
    business: string,
    gender: boolean,
    secondname:string,
    email:string,
    phone:string,
    tests: Template[]
}