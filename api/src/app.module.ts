import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListsModule } from './resources/lists/lists.module';
import {TasksModule} from "./resources/tasks/tasks.module";
import 'dotenv/config';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URI), ListsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
