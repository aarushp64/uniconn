const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'Student' }, // Student, Faculty, Alumni
    avatar: { type: String },
    bio: { type: String },
    skills: [String],
    projects: [{
        title: String,
        description: String,
        link: String,
        tags: [String]
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
