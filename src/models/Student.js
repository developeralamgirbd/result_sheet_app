const {Schema, model} = require('mongoose');

const studentSchema = new Schema({

    roleNo: {
        type: String,
        required: [true, 'Role No is required'],
        unique: true
    },
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    accountancy: {
        type: Number,
        required: [true, 'Accountancy is required'],
    },
    english: {
        type: Number,
        required: [true, 'English is required'],
    },
    math: {
        type: Number,
        required: [true, 'Math is required'],
    },
    economics: {
        type: Number,
        required: [true, 'Economics is required'],
    },
    businessStudies: {
        type: Number,
        required: [true, 'Business Study is required'],
    }

}, {timestamps: true, versionKey: false});

const Student = model('Student', studentSchema);

module.exports = Student;