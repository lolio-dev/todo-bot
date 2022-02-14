import {Module} from '@nestjs/common';
import {ListsService } from './lists.service';
import {ListsController } from './lists.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {List, ListSchema} from "./schemas/list.schema";
import {Task, TaskSchema} from "../tasks/schemas/task.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: List.name, schema: ListSchema },
    { name: Task.name, schema: TaskSchema }
  ])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
