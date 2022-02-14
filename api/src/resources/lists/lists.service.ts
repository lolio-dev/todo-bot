import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {List, ListDocument} from "./schemas/list.schema";
import {Task, TaskDocument} from "../tasks/schemas/task.schema";
import {Model} from "mongoose";
import CreateListDto from "./dto/CreateListDto";

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private listModel: Model<ListDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async checkIfListExists(listId) {
    let list: List
    try {
      list = await this.listModel.findById({ _id: listId });
    } catch (e) {
      throw new HttpException({status: HttpStatus.BAD_REQUEST, error: 'Bad list id format'}, HttpStatus.BAD_REQUEST);
    }

    if (!list) throw new HttpException({status: HttpStatus.NOT_FOUND, error: 'List not found'}, HttpStatus.NOT_FOUND);

    return true
  }

  async createList(createListDto: CreateListDto) {
    createListDto.creation_date = new Date();
    await new this.listModel(createListDto).save();

    return 'List was created'
  }

  async getLists(): Promise<List[]> {
    return this.listModel.find();
  }

  async getList(listId: number) {
    let list;
    if (await this.checkIfListExists(listId)) {
      list = this.listModel.findById({_id: listId});
    }

    return list
  }

  async renameList(listId: number, newTitle: string) {
    if (await this.checkIfListExists(listId)) {
      await this.listModel.findByIdAndUpdate({ _id: listId }, { title: newTitle });
    }

    return 'List was renamed';
  }

  async deleteList(listId: number) {
    if (await this.checkIfListExists(listId)) {
      await this.listModel.findByIdAndDelete({ _id: listId })
    }

    return 'List was deleted';
  }


  async getTasksFromListId(listId: number) {
    await this.checkIfListExists(listId)

    const tasks = await this.taskModel.find({'listId': listId});

    if (!tasks.length) throw new HttpException({status: HttpStatus.NOT_FOUND, error: `No tasks associated to list ${listId}`}, HttpStatus.NOT_FOUND);

    return tasks
  }

  async cleanList(listId: number) {
    await this.checkIfListExists(listId);

    await this.taskModel.deleteMany({ listId: listId, isCompleted: true })

    return 'List cleaned'
  }
}
