import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop()
  title: string;

  @Prop()
  creator: string;

  @Prop({ default: new Date() })
  creation_date: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
