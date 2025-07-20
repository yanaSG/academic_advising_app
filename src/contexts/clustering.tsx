// src/contexts/clustering.tsx
import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

// Types
export interface Cluster {
  id: number;
  cluster_id: string;
  name: string;
  description: string;
  advisor: number | null;
  student_count: number;
}

export interface Advisor {
  id: number;
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

interface ClusteringContextType {
  clusters: Cluster[];
  students: Student[];
  advisors: Advisor[];
  availableClusters: Cluster[];
  loading: boolean;
  reloadData: () => void;
}

// Context
export const ClusteringContext = createContext<ClusteringContextType>({
  clusters: [],
  students: [],
  advisors: [],
  availableClusters: [],
  loading: true,
  reloadData: () => {},
});

// Provider
export const ClusteringProvider = ({ children }: { children: ReactNode }) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [availableClusters, setAvailableClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const baseURL = 'http://localhost:8000/api';

  const fetchData = async () => {
    setLoading(true);
    try {
      const [clustersRes, studentsRes, advisorsRes, availableRes] = await Promise.all([
        axios.get<Cluster[]>(`${baseURL}/clusters/`),
        axios.get<Student[]>(`${baseURL}/students/`),
        axios.get<Advisor[]>(`${baseURL}/advisors/`),
        axios.get<Cluster[]>(`${baseURL}/clusters/available/`)
      ]);
      setClusters(clustersRes.data);
      setStudents(studentsRes.data);
      setAdvisors(advisorsRes.data);
      setAvailableClusters(availableRes.data);
    } catch (error) {
      console.error('❌ Error fetching clustering data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ClusteringContext.Provider
      value={{
        clusters,
        students,
        advisors,
        availableClusters,
        loading,
        reloadData: fetchData,
      }}
    >
      {children}
    </ClusteringContext.Provider>
  );
};
