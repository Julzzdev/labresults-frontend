import { Template } from '../interfaces/Template.interface'
export interface Patient {
    code:string, 
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    business: string,
    gender: string,
    tests: Template[]
}