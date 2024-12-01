// export const dbData = {
//   // Users Collection
//   Users: [
//     {
//       userId: "adv1",
//       role: "advisor",
//       name: "Bilal",
//       email: "bilal@gmail.com",
//       password: "123",
//     },
//     {
//       userId: "adv2",
//       role: "advisor",
//       name: "Saad",
//       email: "saad@gmail.com",
//       password: "123",
//     },
//     {
//       userId: "adm1",
//       role: "admin",
//       name: "Ammar",
//       email: "ammar@gmail.com",
//       password: "123",
//     },
//     {
//       userId: "sp21-bse-005",
//       role: "student",
//       name: "Javid1",
//       email: "javid1@gmail.com",
//       password: "123",
//     },
//     {
//       userId: "sp21-bse-029",
//       role: "student",
//       name: "Javid2",
//       email: "javid2@gmail.com",
//       password: "123",
//     },
//     {
//       userId: "sp21-bse-045",
//       role: "student",
//       name: "Javid3",
//       email: "javid3@gmail.com",
//       password: "123",
//     },
//   ],
//   // Classes Collection
//   Classes: [
//     {
//       classId: "SP21-BSE-8A",
//       className: "SP21-BSE-8A",
//       advisorId: "adv2",
//       students: ["sp21-bse-045"],
//     },
//     {
//       classId: "SP21-BCS-8A",
//       className: "SP21-BCS-8A",
//       advisorId: "adv1",
//       students: ["sp21-bse-005", "sp21-bse-029"],
//     },
//   ],

//   // Courses Collection
//   Courses: [
//     {
//       courseId: "CSC101",
//       courseTitle: "Introduction to ICT",
//       creditHours: "3(2,1)",
//       preRequisites: null,
//       type: null,
//     },
//     {
//       courseId: "CSC102",
//       courseTitle: "Discrete Structures",
//       creditHours: "3(3,0)",
//       preRequisites: null,
//       type: null,
//     },

//     {
//       courseId: "CSC103",
//       courseTitle: "Programming Fundamentals",
//       creditHours: "4(3,1)",
//       preRequisites: null,
//       type: null,
//     },

//     {
//       courseId: "CSC211",
//       courseTitle: "Data Structures and Algorithms",
//       creditHours: "4(3,1)",
//       preRequisites: "CSC103",
//       type: null,
//     },
//   ],

//   // SchemeOfStudy Collection (Associates Courses to Classes)
//   SchemeOfStudy: [
//     {
//       sosId: "SP21-BSE-8A",
//       classId: "SP21-BSE-8A",
//       courses: ["CSC101", "CSC102", "CSC103"],
//     },
//     {
//       sosId: "SP21-BCS-8A",
//       classId: "SP21-BCS-8A",
//       courses: ["CSC101", "CSC211", "CSC103"],
//     },
//   ],

//   // Results Collection (Stores Student Results per Course)
//   Results: [
//     {
//       studentId: "sp21-bse-005",
//       result_card: [
//         {
//           semester: "Spring 2021",
//           gpa: 3.32,
//           cgpa: 3.32,
//           courses: [
//             {
//               courseId: "CSC101",
//               marks: 76,
//             },
//             {
//               courseId: "EEE121",
//               marks: 80,
//             },
//             {
//               courseId: "HUM100",
//               marks: 75,
//             },
//             {
//               courseId: "HUM110",
//               marks: 83,
//             },
//             {
//               courseId: "MTH104",
//               marks: 90,
//             },
//           ],
//         },
//         {
//           semester: "Fall 2021",
//           gpa: 3.48,
//           cgpa: 3.4,
//           courses: [
//             {
//               courseId: "CSC102",
//               marks: 80,
//             },
//             {
//               courseId: "CSC103",
//               marks: 85,
//             },
//             {
//               courseId: "CSC110",
//               marks: 75,
//             },
//             {
//               courseId: "HUM103",
//               marks: 78,
//             },
//             {
//               courseId: "HUM111",
//               marks: 85,
//             },
//             {
//               courseId: "MTH105",
//               marks: 93,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       studentId: "sp21-bse-029",
//       result: [
//         {
//           semester: "Spring 2023",
//           gpa: 3.51,
//           cgpa: 3.39,
//           courses: [
//             {
//               courseNo: "CSC232",
//               marks: 80,
//             },
//             {
//               courseNo: "CSC336",
//               marks: 86,
//             },
//             {
//               courseNo: "CSC354",
//               marks: 80,
//             },
//             {
//               courseNo: "CSE302",
//               marks: 90,
//             },
//             {
//               courseNo: "CSE305",
//               marks: 91,
//             },
//           ],
//         },
//         {
//           semester: "Fall 2023",
//           gpa: 3.54,
//           cgpa: 3.4,
//           courses: [
//             {
//               courseNo: "CSC455",
//               marks: 87,
//             },
//             {
//               courseNo: "CSE303",
//               marks: 86,
//             },
//             {
//               courseNo: "CSE354",
//               marks: 95,
//             },
//             {
//               courseNo: "MGT101",
//               marks: 82,
//             },
//             {
//               courseNo: "MGT350",
//               marks: 71,
//             },
//           ],
//         },
//         {
//           semester: "Spring 2024",
//           gpa: 3.56,
//           cgpa: 3.41,
//           courses: [
//             {
//               courseNo: "CSC356",
//               marks: 72,
//             },
//             {
//               courseNo: "CSC432",
//               marks: 70,
//             },
//             {
//               courseNo: "CSE498",
//               marks: 97,
//             },
//             {
//               courseNo: "MGT403",
//               marks: 91,
//             },
//             {
//               courseNo: "MTH262",
//               marks: 88,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// export const dbData = {
//   users: [],
//   classes: [],
//   courses: [],
//   schemeOfStudy: [],
//   results: [],
// };
