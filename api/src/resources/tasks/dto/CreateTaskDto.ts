import {ObjectId} from "mongoose";

interface CreateTaskDto {
  name: string
  listId: ObjectId
}

export default CreateTaskDto
