import { Injectable, OnModuleInit, OnModuleDestroy, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager, DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { Movie, MovieDTO } from 'src/types/Movie';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);



@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  idx: number;


  async updateMovie(id: number, body: MovieDTO) {
    const idx = this.database.findIndex(el => el.id === id)
    if (idx === -1){
      throw new HttpException("Movie not founded", HttpStatus.BAD_REQUEST)
    }
    this.database[idx] = {...this.database[idx], ...body}
    await this.takeSnapshot()
    return {
      message: 'Movie updated successfully'
    }
  }

  async deleteMovie(id: number) {
    const movieExists = this.database.some(el => el.id === id);
    if (movieExists) {
      this.database = this.database.filter(el => el.id !== id);
      await this.takeSnapshot()
      return {
        message: "Movie deleted successfully",
      };
    } 
    throw new HttpException("Movie not founded", HttpStatus.BAD_REQUEST)
  }
  
  async createMovie(movie: MovieDTO) {
    
    // perigo em sistema altamente concorrente(muitas requisições atrapalham o contador idx)
    this.database.push({
      id: ++this.idx,
      ...movie
    })

    await this.takeSnapshot()
    return {
      id: this.idx,
      message: "Movie created successfully"
    }
  }


  getMovies(id?: number): Movie | Movie[] {
    if (id === null || id === undefined) {
      return this.database;    
    }
    const movie = this.database.find(movie => movie.id === id);
    if (movie) {
      return movie;  
    } else {
      throw new HttpException("Movie not founded", HttpStatus.BAD_REQUEST)
    }

  }

  
  private readonly dataFilePath = path.join(__dirname,'..','..','src','models','movies.json');
  private readonly logger = new Logger(DatabaseService.name)
  database : Array<Movie>

  async onModuleDestroy() {
    await this.takeSnapshot()
  }

  async onModuleInit() {
    try {
      const data = await readFileAsync(this.dataFilePath, 'utf8');
      this.database = JSON.parse(data);
      this.idx = this.database.length
      this.logger.log('Data loaded successfully');
      this.logger.log({database : this.database});
    } catch (error) {
      this.logger.error('Could not load data', error);
    }
  }

  async takeSnapshot() {
    try {
      await writeFileAsync(this.dataFilePath, JSON.stringify(this.database, null, 2));
      this.logger.log('Data saved successfully');
    } catch (error) {
      this.logger.error('Could not save data', error);
    }
  }

  sayHello() {
    return 'Hello world!';
  }
}
