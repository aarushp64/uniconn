const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    type: { type: String, enum: ['Internship', 'Full-time', 'Part-time', 'Contract'], default: 'Internship' },
    description: { type: String, required: true },
    tags: [String],
    stipend: { type: String },
    deadline: { type: Date },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);
