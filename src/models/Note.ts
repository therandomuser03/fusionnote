// models/Note.ts
import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true })

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema)
export default Note
