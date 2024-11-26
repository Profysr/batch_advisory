import { Schema } from "mongoose";

const roleEnum = ["admin", "advisor", "student"]; // Enum for roles

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: roleEnum, required: true }, // Role of the user
  assignedClass: { type: Schema.Types.ObjectId, ref: "Class" }, // Linked to Class (Admin)
  batchAdvisor: { type: Schema.Types.ObjectId, ref: "Advisor" }, // Advisor for students
});

const classSchema = new Schema({
  className: { type: String, required: true },
  department: { type: String, default: "Computer Science" },
  semester: { type: String, required: true, default: "Spring 2021" },
  advisor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Admin assigns an advisor
  students: [{ type: Schema.Types.ObjectId, ref: "User" }], // Students assigned to this class
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }], // Courses assigned to this class
});

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  preRequisites: [{ type: String }], // Prerequisites for the course
  assignedClass: { type: Schema.Types.ObjectId, ref: "Class" }, // Link to Class
});

const advisorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
  assignedClass: [{ type: Schema.Types.ObjectId, ref: "Class" }], // Classes managed by the advisor
});

const studentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
  class: { type: Schema.Types.ObjectId, ref: "Class" }, // Assigned class (Admin)
  assignedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }], // Courses assigned to student
  previousResults: [
    {
      course: { type: Schema.Types.ObjectId, ref: "Course" },
      grade: { type: String },
      status: { type: String, enum: ["passed", "failed"] },
    },
  ], // Previous results (Advisor checks and allocates courses)
});

export const User = mongoose.model("User", userSchema);

export const Class = mongoose.model("Class", classSchema);

export const Course = mongoose.model("Course", courseSchema);

export const Advisor = mongoose.model("Advisor", advisorSchema);

export const Student = mongoose.model("Student", studentSchema);
