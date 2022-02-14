import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ListsService} from './lists.service';
import CreateListDto from "./dto/CreateListDto";
import {List} from "./schemas/list.schema";
import renameListDto from "./dto/RenameListDto";

@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
  ) {
  }

  @Get()
  async getLists(): Promise<List[]> {
    return this.listsService.getLists();
  }

  @Get(':listId')
  async getList(
    @Param('listId') listId: number,
  ) {
    return await this.listsService.getList(listId);
  }

  @Post()
  async createList(@Body() listDto: CreateListDto) {
    return await this.listsService.createList(listDto);
  }

  @Patch(':listId')
  async renameList(
    @Param('listId') listId: number,
    @Body() body: renameListDto,
  ) {
    return await this.listsService.renameList(listId, body.newTitle);
  }

  @Delete(':listId')
  async deleteList(
    @Param('listId') listId: number,
    @Body() body,
  ) {
    return await this.listsService.deleteList(listId);
  }

  @Get(':listId/tasks')
  async getTasks(
    @Param('listId') listId: number,
  ) {
    return await this.listsService.getTasksFromListId(listId);
  }

  @Patch(':listId/clean')
  async cleanList(
    @Param('listId') listId: number,
  ) {
    return await this.listsService.cleanList(listId);
  }
}
