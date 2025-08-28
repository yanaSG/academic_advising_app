
// src/services/studentService.ts
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/clustering/students/'; // Endpoint for StudentViewSet

// Define the shape of a Student record (matching your Django Student model)
export interface StudentRecord {
  id: number;
  student_id: string;
  name: string | null;
  program_and_grade: string;
  cluster: number | null; // Assuming cluster is an ID (integer)
}

// Define the payload for creating/updating a student (without 'id')
export interface StudentPayload {
  student_id: string;
  name?: string | null; // Optional fields
  program_and_grade: string;
  cluster?: number | null;
}

/**
 * Fetches all student records.
 * @returns A promise that resolves to an array of StudentRecord.
 */
export const fetchStudents = () => axios.get<StudentRecord[]>(BASE_URL);

/**
 * Fetches a single student record by ID.
 * @param id The ID of the student to fetch.
 * @returns A promise that resolves to a StudentRecord.
 */
export const fetchStudent = (id: number) =>
  axios.get<StudentRecord>(`${BASE_URL}${id}/`);

/**
 * Creates a new student record.
 * @param data The payload for the new student.
 * @returns A promise that resolves to the created StudentRecord.
 */
export const createStudent = (data: StudentPayload) =>
  axios.post<StudentRecord>(BASE_URL, data);

/**
 * Updates an existing student record.
 * @param id The ID of the student to update.
 * @param data The payload for the updated student.
 * @returns A promise that resolves to the updated StudentRecord.
 */
export const updateStudent = (id: number, data: StudentPayload) =>
  axios.put<StudentRecord>(`${BASE_URL}${id}/`, data);

/**
 * Deletes a student record.
 * @param id The ID of the student to delete.
 * @returns A promise that resolves when the deletion is successful.
 */
export const deleteStudent = (id: number) =>
  axios.delete<void>(`${BASE_URL}${id}/`);

// --- CSV Upload related service function (if needed in a dedicated service) ---
// Note: This function would interact with your CSVUploadView endpoint,
// not directly with the StudentViewSet.
export const uploadCSV = (file: File) => {
  const formData = new FormData();
  formData.append('csv_file', file);
  // Assuming your CSV upload endpoint is http://127.0.0.1:8000/api/clustering/upload-csv/
  return axios.post('http://127.0.0.1:8000/api/clustering/upload-csv/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



// Appends a form response to the main CSV file by converting the form to a CSV row and uploading it
export const appendSurveyToCSV = async (responses: any) => {
  if (!responses) return;
  // Define the order of fields as they appear in the form (top to bottom)
  const orderedFields = [
    'studentId',
    'program',
    'gender',
    'gpa',
    'performance',
    'workload',
    'learningStyle',
    'problemSolving',
    'personality',
    'hobbies',
    'otherHobbies',
    'financial',
    'parentsStatus',
    'birthOrder',
    'responsibilities',
  ];
  const replacer = (value: any) => (Array.isArray(value) ? value.join('; ') : value ?? '');
  const row = orderedFields.map(field => JSON.stringify(replacer(responses[field]))).join(',');
  const csvContent = row + '\r\n';
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const file = new File([blob], 'student_survey_append.csv', { type: 'text/csv' });
  // Use the existing uploadCSV function to send the new row to the backend
  return uploadCSV(file);
};