import mongoose from "mongoose";
import bcrypt from "bcrypt"

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:[true, 'email must be unique']
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },


})

userSchema.path('password').set(value => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(value, salt);
    return hash;
});

userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
        error.errors = { email: { message: 'Email is already used' }};
    }
    next(error);
});

userSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName[0]}.`;
});

const user = new mongoose.model('user', userSchema)

export {
    user
}