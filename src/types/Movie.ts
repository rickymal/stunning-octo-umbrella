import { IsNumber, IsString } from "class-validator"

export type Movie = {
    id : number,
    title: string 
    director: string
    year : number
}

export class MovieDTO {

    @IsString()
    title: string 

    @IsString()
    director: string

    @IsNumber()
    year : number
}