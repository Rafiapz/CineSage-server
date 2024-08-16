import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IUsers {
    _id?: ObjectId;
    email: String;
    fullName: String;
    password: String;
    role: String;
    profilePhoto:String
}

const UsersSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profilePhoto:{type:String}
});

const Users = mongoose.model<IUsers>('Users', UsersSchema);

export default Users;

