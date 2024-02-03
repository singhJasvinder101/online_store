import { model, models, Schema } from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: { type: String },
    email: {
        type: String,
        required: true,
        validate: email => {
            if (!validator.isEmail(email)) {
                throw new Error("Invalid Email")
            }
        },
        unique: [true, "User Already Exists"],
    },
    password: {
        type: String,
        validate: pass => {
            if (!pass?.length || pass.length < 6) {
                throw new Error("Password must be at least 6 characters")
            }
        },
        trim: true,
        match: [/^(?=.*[!@#$%^&*?])(?=.*[A-Z])(?=.*\d).{5,}$/, "invalid password"],
        required: true
    },
    image: { type: String },
    
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    // if password did not get changed, next()
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
});

export const User = models?.User || model('User', userSchema);