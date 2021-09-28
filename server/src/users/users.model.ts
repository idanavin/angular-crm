import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    employee_id: { type: String, required: false},
    is_admin: { type: Boolean, required: true},
    is_manager: { type: Boolean, required: true}
})

export interface User {
    id: string;
    username: string;
    password: string;
    employee_id?: string;
    is_admin: boolean;
    is_manager: boolean;
}