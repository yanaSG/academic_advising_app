// src/services/dashboardService.ts
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/clustering/'; // Base URL for your Django API

/**
 * Fetches the total number of students.
 * @returns A promise that resolves to an object containing the student count.
 */
export const fetchStudentCount = () => axios.get<{ student_count: number }>(`${BASE_URL}student-count/`);

/**
 * Fetches the total number of advisors.
 * @returns A promise that resolves to an object containing the advisor count.
 */
export const fetchAdvisorCount = () => axios.get<{ advisor_count: number }>(`${BASE_URL}advisor-count/`);

/**
 * Fetches data for a specific graph type.
 * @param graphType - The type of graph data to fetch (e.g., 'students_per_level', 'students_per_program', 'student_clusters')
 * @param secondaryFeature - Optional: For 'student_clusters' graph, specifies the secondary feature for the Y-axis.
 * @returns A promise that resolves to the graph data. The structure depends on the graphType.
 */
export const fetchGraphData = (graphType: string, secondaryFeature?: string) => {
  let url = `${BASE_URL}graph-data/?graph_type=${graphType}`;
  if (graphType === 'student_clusters' && secondaryFeature) {
    url += `&secondary_feature=${secondaryFeature}`;
  }
  return axios.get<any>(url);
};
