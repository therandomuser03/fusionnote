// models/Note.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: Record<string, any>;
  ownerId: mongoose.Types.ObjectId;
}

const NoteSchema: Schema<INote> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed, // ✅ Accepts any valid TipTap JSON
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Force remove old cached model in dev (Next.js reload-safe)
const Note = mongoose.models.Note
  ? mongoose.deleteModel('Note') && mongoose.model<INote>('Note', NoteSchema)
  : mongoose.model<INote>('Note', NoteSchema);

export default Note;
