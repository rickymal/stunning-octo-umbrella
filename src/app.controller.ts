import { Body, Controller, Get, Injectable, Post, Query, Req, Param, Header, Headers, HttpCode, HttpStatus, HttpException, Delete, Put } from '@nestjs/common';

import { DatabaseService } from './database/database.service';
import { MovieDTO } from './types/Movie';



@Controller()
export class AppController {
  database: DatabaseService;
  constructor(database: DatabaseService ) {
    this.database = database
  }

  @Get()
  getHello(): string {
    return this.database.sayHello()
  }

  @HttpCode(HttpStatus.OK)
  @Get('/movies')
  getAllMovies() {
    return this.database.getMovies()
  }

  @HttpCode(HttpStatus.OK)
  @Get('/movies/:id')
  getSpecificMovies(@Param('id') id : string) {
    return this.database.getMovies(parseInt(id))
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/movies')
  async createMovie(@Body() movie : MovieDTO) {
    return await this.database.createMovie(movie)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/movies/:id')
  async deleteMovie(@Param('id') id : string) {
    return await this.database.deleteMovie(parseInt(id))
  }

  @HttpCode(HttpStatus.OK)
  @Put('/movies/:id')
  async updateMovie(@Param('id') id : string, @Body() body : MovieDTO) {
    return await this.database.updateMovie(parseInt(id), body)
  }

}


