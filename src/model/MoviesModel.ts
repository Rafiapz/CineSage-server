import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IMovies extends Document {
    _id: ObjectId;
    title: String;
    description: String;
    duration: Number;
    rating: Number | null;
    genres: String[];
    poster: String;
    releaseDate: Date
}

const MoviesSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    rating: { type: Number },
    genres: [{ type: String, required: true, }],
    poster: { type: String, required: true },
    releaseDate: { type: Date }
});

const Movies = mongoose.model<IMovies>('movies', MoviesSchema);

export default Movies;

