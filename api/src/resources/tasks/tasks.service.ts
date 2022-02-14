import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "./schemas/task.schema";
import {Model} from "mongoose";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {
  }

  async checkIfTaskExists(taskId) {
    let task: Task;
    try {
      task = await this.taskModel.findById({_id: taskId});
    } catch (e) {
      throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'Bad list id format'}, HttpStatus.BAD_REQUEST);
    }

    if (!task) throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'List not found'}, HttpStatus.NOT_FOUND);

    return true;
  }

  async createTask(taskDto) {
    await new this.taskModel(taskDto).save();

    return 'Task created';
  }

  async renameTask(taskId: number, newTitle: string) {
    if (await this.checkIfTaskExists(taskId)) {
      await this.taskModel.findByIdAndUpdate({_id: taskId}, {'title': newTitle}).exec();
    }

    return 'Task renamed';
  }

  async deleteTask(taskId: number) {
    if (await this.checkIfTaskExists(taskId)) {
      await this.taskModel.findByIdAndDelete({_id: taskId});
    }

    return 'Task deleted';
  }

  async completeTask(taskId: number) {
    if (await this.checkIfTaskExists(taskId)) {
      await this.taskModel.findByIdAndUpdate({_id: taskId}, {'isCompleted': true});
    }

    return 'Task completed';
  }

  async uncompleteTask(taskId: number) {
    if (await this.checkIfTaskExists(taskId)) {
      await this.taskModel.findByIdAndUpdate({_id: taskId}, {'isCompleted': false});
    }

    return 'Task uncompleted';
  }
}
