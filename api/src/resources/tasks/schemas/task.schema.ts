import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

export type TaskDocument = Task & Document;

@Schema()
export class Task{
  @Prop()
  title: string;

  @Prop()
  listId: Types.ObjectId;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
