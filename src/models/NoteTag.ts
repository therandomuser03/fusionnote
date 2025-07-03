// src/models/NoteTag.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INoteTag extends Document {
  noteId: mongoose.Types.ObjectId;
  tagId: mongoose.Types.ObjectId;
  createdAt?: Date;
}

const NoteTagSchema = new Schema<INoteTag>(
  {
    noteId: { type: Schema.Types.ObjectId, ref: "Note", required: true },
    tagId: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  { timestamps: true }
);

NoteTagSchema.index({ noteId: 1, tagId: 1 }, { unique: true });

const NoteTag = mongoose.models.NoteTag || mongoose.model<INoteTag>("NoteTag", NoteTagSchema);
export default NoteTag;
