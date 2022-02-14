import {Body, Controller, Delete, Param, Patch, Post} from '@nestjs/common';
import {TasksService} from './tasks.service';
import CreateTaskDto from "./dto/CreateTaskDto";
import renameTaskDto from "./dto/RenameTaskDto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Post()
  async createTask(
    @Body() taskDto: CreateTaskDto
  ) {
    return await this.tasksService.createTask(taskDto);
  }

  @Patch(':taskId')
  async renameTask(
    @Param('taskId') taskId: number,
    @Body() body: renameTaskDto,
  ) {
    return await this.tasksService.renameTask(taskId, body.newTitle);
  }

  @Delete(':taskId')
  async deleteTask(
    @Param('taskId') taskId: number
  ) {
    return await this.tasksService.deleteTask(taskId);
  }

  @Patch(':taskId/complete')
  async completeTask(
    @Param('taskId') taskId: number,
  ) {
    return await this.tasksService.completeTask(taskId);
  }

  @Patch(':taskId/uncomplete')
  async uncompleteTask(
    @Param('taskId') taskId: number,
  ) {
    return await this.tasksService.uncompleteTask(taskId);
  }
}
