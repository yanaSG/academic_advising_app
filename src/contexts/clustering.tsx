// src/contexts/clustering.tsx
import { createContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

import {
  createAdvisor as apiCreateAdvisor,
  updateAdvisor as apiUpdateAdvisor,
  deleteAdvisor as apiDeleteAdvisor,
} from '../services/advisorService';

import {
  fetchGraphData as apiFetchGraphData,
  fetchStudentCount as apiFetchStudentCount,
  fetchAdvisorCount as apiFetchAdvisorCount,
} from '../services/dashboardService';

import {
  fetchStudents as apiFetchStudents,
  createStudent as apiCreateStudent,
  updateStudent as apiUpdateStudent,
  deleteStudent as apiDeleteStudent,
  uploadCSV as apiUploadCSV,
} from '../services/studentService';

// ================== TYPES ==================
export interface Cluster {
  id: number;
  cluster_id: number;
  name: string;
  description: string;
  advisor: number | null;
  advisor_name?: string | null;
  student_count: number;
}

export interface Advisor {
  id: number;
  advisor_id: string;
  name: string;
  email: string;
  cluster?: number | null;
}

export interface Student {
  id: number;
  student_id: string;
  name: string | null;
  program_and_grade: string;
  cluster: number | null;
}

export interface StudentsPerLevelData {
  yearLevel: string;
  students: number;
  percentage: number;
}

export interface StudentsPerProgramData {
  program: string;
  students: number;
  percentage: number;
}

export interface StudentClusterDataset {
  label: string;
  data: { x: number; y: number }[];
  backgroundColor: string;
  pointRadius: number;
}

export interface StudentClustersData {
  datasets: StudentClusterDataset[];
}

// ================== CONTEXT TYPE ==================
interface ClusteringContextType {
  clusters: Cluster[];
  students: Student[];
  advisors: Advisor[];
  availableClusters: Cluster[];
  loading: boolean;
  reloadData: () => void;

  createAdvisor: (payload: Omit<Advisor, 'id'>) => Promise<Advisor>;
  updateAdvisor: (id: number, payload: Omit<Advisor, 'id'>) => Promise<Advisor>;
  deleteAdvisor: (id: number) => Promise<void>;

  studentsPerLevelData: StudentsPerLevelData[];
  studentsPerProgramData: StudentsPerProgramData[];
  studentClustersData: StudentClustersData;
  studentCount: number | null;
  advisorCount: number | null;
  graphDataLoading: boolean;
  lastFetchedClusterFeature: string | null;
  fetchGraphDataByType: (graphType: string, secondaryFeature?: string) => Promise<any>;

  fetchStudents: () => Promise<Student[]>;
  createStudent: (payload: Omit<Student, 'id'>) => Promise<Student>;
  updateStudent: (id: number, payload: Omit<Student, 'id'>) => Promise<Student>;
  deleteStudent: (id: number) => Promise<void>;
  uploadCSV: (file: File) => Promise<any>;
}

// ================== CONTEXT DEFAULT ==================
export const ClusteringContext = createContext<ClusteringContextType>({
  clusters: [],
  students: [],
  advisors: [],
  availableClusters: [],
  loading: true,
  reloadData: () => Promise.resolve(),

  createAdvisor: async () => { throw new Error('createAdvisor not implemented'); },
  updateAdvisor: async () => { throw new Error('updateAdvisor not implemented'); },
  deleteAdvisor: async () => { throw new Error('deleteAdvisor not implemented'); },

  studentsPerLevelData: [],
  studentsPerProgramData: [],
  studentClustersData: { datasets: [] },
  studentCount: null,
  advisorCount: null,
  graphDataLoading: false,
  lastFetchedClusterFeature: null,
  fetchGraphDataByType: async () => { throw new Error('fetchGraphDataByType not implemented'); },

  fetchStudents: async () => { throw new Error('fetchStudents not implemented'); },
  createStudent: async () => { throw new Error('createStudent not implemented'); },
  updateStudent: async () => { throw new Error('updateStudent not implemented'); },
  deleteStudent: async () => { throw new Error('deleteStudent not implemented'); },
  uploadCSV: async () => { throw new Error('uploadCSV not implemented'); },
});

// ================== PROVIDER ==================
interface ClusteringProviderProps {
  children: ReactNode;
}

export const ClusteringProvider: React.FC<ClusteringProviderProps> = ({ children }) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [studentsPerLevelData, setStudentsPerLevelData] = useState<StudentsPerLevelData[]>([]);
  const [studentsPerProgramData, setStudentsPerProgramData] = useState<StudentsPerProgramData[]>([]);
  const [studentClustersData, setStudentClustersData] = useState<StudentClustersData>({ datasets: [] });
  const [lastFetchedClusterFeature, setLastFetchedClusterFeature] = useState<string | null>(null);
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [advisorCount, setAdvisorCount] = useState<number | null>(null);
  const [graphDataLoading, setGraphDataLoading] = useState<boolean>(false);

  // ✅ Fetch data and compute student_count
  const fetchData = async () => {
    setLoading(true);
    try {
      const [clustersRes, studentsRes, advisorsRes] = await Promise.all([
        axios.get<Cluster[]>('http://127.0.0.1:8000/api/clustering/clusters/'),
        axios.get<Student[]>('http://127.0.0.1:8000/api/clustering/students/'),
        axios.get<Advisor[]>('http://127.0.0.1:8000/api/clustering/advisors/'),
      ]);

      const studentsData = studentsRes.data;
      const clustersWithCount: Cluster[] = clustersRes.data.map(cluster => ({
        ...cluster,
        student_count: studentsData.filter(s => s.cluster === cluster.id).length,
      }));

      setClusters(clustersWithCount);
      setStudents(studentsData);
      setAdvisors(advisorsRes.data);
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch student/advisor counts
  const fetchCounts = async () => {
    setGraphDataLoading(true);
    try {
      const [studentCountRes, advisorCountRes] = await Promise.all([
        apiFetchStudentCount(),
        apiFetchAdvisorCount(),
      ]);
      setStudentCount(studentCountRes.data.student_count);
      setAdvisorCount(advisorCountRes.data.advisor_count);
    } catch (err) {
      console.error('Failed to fetch counts:', err);
    } finally {
      setGraphDataLoading(false);
    }
  };

  // ✅ Advisor CRUD
  const createAdvisor = async (payload: Omit<Advisor, 'id'>): Promise<Advisor> => {
    setLoading(true);
    try {
      const response = await apiCreateAdvisor(payload);
      await fetchData();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const updateAdvisor = async (id: number, payload: Omit<Advisor, 'id'>): Promise<Advisor> => {
    setLoading(true);
    try {
      const response = await apiUpdateAdvisor(id, payload);
      await fetchData();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const deleteAdvisor = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await apiDeleteAdvisor(id);
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Student CRUD
  const createStudent = async (payload: Omit<Student, 'id'>): Promise<Student> => {
    setLoading(true);
    try {
      const response = await apiCreateStudent(payload);
      await fetchData();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id: number, payload: Omit<Student, 'id'>): Promise<Student> => {
    setLoading(true);
    try {
      const response = await apiUpdateStudent(id, payload);
      await fetchData();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await apiDeleteStudent(id);
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  const uploadCSV = async (file: File): Promise<any> => {
    setLoading(true);
    try {
      const response = await apiUploadCSV(file);
      await fetchData();
      await fetchCounts();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Graph Data Fetcher
  const fetchGraphDataByType = async (graphType: string, secondaryFeature?: string) => {
    setGraphDataLoading(true);
    try {
      const result = await apiFetchGraphData(graphType, secondaryFeature);
      if (graphType === 'students_per_level') {
        setStudentsPerLevelData(result.data);
      } else if (graphType === 'students_per_program') {
        setStudentsPerProgramData(result.data);
      } else if (graphType === 'student_clusters') {
        setStudentClustersData(result.data);
        setLastFetchedClusterFeature(secondaryFeature || null);
      }
      return result.data;
    } catch (err) {
      console.error(`Failed to fetch ${graphType} data:`, err);
      return null;
    } finally {
      setGraphDataLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchData();
    fetchCounts();
  }, []);

  const availableClusters = useMemo(() => {
    return clusters.filter(cluster => !cluster.advisor);
  }, [clusters]);

  return (
    <ClusteringContext.Provider
      value={{
        clusters,
        students,
        advisors,
        availableClusters,
        loading,
        reloadData: fetchData,

        createAdvisor,
        updateAdvisor,
        deleteAdvisor,

        studentsPerLevelData,
        studentsPerProgramData,
        studentClustersData,
        studentCount,
        advisorCount,
        graphDataLoading,
        lastFetchedClusterFeature,
        fetchGraphDataByType,

        fetchStudents: () => new Promise<Student[]>((resolve, reject) => {
          apiFetchStudents().then(
            (res: any) => resolve(res.data),
            (err: any) => reject(err)
          );
        }),
        createStudent,
        updateStudent,
        deleteStudent,
        uploadCSV,
      }}
    >
      {children}
    </ClusteringContext.Provider>
  );
};
