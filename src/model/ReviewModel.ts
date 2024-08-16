import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IReviews extends Document {
    movieId: ObjectId;
    rating: String;
    review: String;
    _id: ObjectId;
    userId: ObjectId
}

const ReviewsSchema: Schema = new Schema({
    movieId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: String, required: true },
    review: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' }
});

const Reviews = mongoose.model<IReviews>('Reviews', ReviewsSchema);

export default Reviews;

