// models/DeletedNote.ts
import mongoose, { Schema, Document } from "mongoose";
import { JSONContent } from "@tiptap/react";

export interface IDeletedNote extends Document {
  originalNoteId: mongoose.Types.ObjectId;
  title: string;
  content: JSONContent;
  ownerId: mongoose.Types.ObjectId;
  deletedAt: Date;
  workspaceId?: mongoose.Types.ObjectId;
}

const DeletedNoteSchema: Schema<IDeletedNote> = new Schema(
  {
    originalNoteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Note",
    },
    title: {
      type: String,
      required: true,
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
    deletedAt: {
      type: Date,
      default: Date.now,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: false,
    },
  },
  { timestamps: true }
);

const DeletedNote =
  mongoose.models.DeletedNote ||
  mongoose.model<IDeletedNote>("DeletedNote", DeletedNoteSchema);

export default DeletedNote;
