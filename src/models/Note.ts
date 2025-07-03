// src/models/Note.ts

import mongoose, { Schema, Document } from "mongoose";
import { JSONContent } from "@tiptap/react";

export interface INote extends Document {
  title: string;
  content: JSONContent;
  ownerId: mongoose.Types.ObjectId;
  workspaceId?: mongoose.Types.ObjectId;
  isPinned?: boolean;
  tags?: string[];
}

const NoteSchema: Schema<INote> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Note =
  (mongoose.models.Note as mongoose.Model<INote>) ||
  mongoose.model<INote>("Note", NoteSchema);

export default Note;
