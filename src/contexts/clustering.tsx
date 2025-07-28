// src/contexts/clustering.tsx
import { createContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

import {
  createAdvisor as apiCreateAdvisor,
  updateAdvisor as apiUpdateAdvisor,
  deleteAdvisor as apiDeleteAdvisor,
} from '../services/advisorService';

// Types
export interface Cluster {
  id: number;
  cluster_id: string;
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

// Context value shape
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
}

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
});

export const ClusteringProvider = ({ children }: { children: ReactNode }) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Unassigned clusters only
  const availableClusters = useMemo(
    () => clusters.filter(c => c.advisor === null),
    [clusters]
  );

  const baseURL = 'http://127.0.0.1:8000/api/clustering';

  // Fetch everything
  const fetchData = async () => {
    setLoading(true);
    try {
      const [advRes, clusterRes, stuRes] = await Promise.all([
        axios.get<Advisor[]>(`${baseURL}/advisors/`),
        axios.get<Cluster[]>(`${baseURL}/clusters/`),
        axios.get<Student[]>(`${baseURL}/students/`),
      ]);
      setAdvisors(advRes.data);
      setClusters(clusterRes.data);
      setStudents(stuRes.data);
    } catch (err) {
      console.error('❌ Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create an advisor, then re-fetch to sync clusters AND advisors
  const createAdvisor = async (payload: Omit<Advisor, 'id'>): Promise<Advisor> => {
    setLoading(true);
    try {
      const response = await apiCreateAdvisor(payload);
      // full refresh ensures clusters.advisor is updated
      await fetchData();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Update an advisor, then re-fetch
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

  // Delete an advisor, then re-fetch
  const deleteAdvisor = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await apiDeleteAdvisor(id);
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  // on mount
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
        createAdvisor,
        updateAdvisor,
        deleteAdvisor,
      }}
    >
      {children}
    </ClusteringContext.Provider>
  );
};
