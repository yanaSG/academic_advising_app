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

// Default context
export const ClusteringContext = createContext<ClusteringContextType>({
  clusters: [],
  students: [],
  advisors: [],
  availableClusters: [],
  loading: true,
  reloadData: () => {},
  createAdvisor: async () => { throw new Error('createAdvisor not implemented'); },
  updateAdvisor: async () => { throw new Error('updateAdvisor not implemented'); },
  deleteAdvisor: async () => { throw new Error('deleteAdvisor not implemented'); },
});

// Provider
export const ClusteringProvider = ({ children }: { children: ReactNode }) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // availableClusters derived from clusters where no advisor assigned
  const availableClusters = useMemo(
    () => clusters.filter(c => c.advisor === null),
    [clusters]
  );

  const baseURL = 'http://127.0.0.1:8000/api/clustering';

  const fetchData = async () => {
    setLoading(true);

    // Fetch advisors
    try {
      const res = await axios.get<Advisor[]>(`${baseURL}/advisors/`);
      setAdvisors(res.data);
    } catch (err) {
      console.error('❌ Error fetching advisors:', err);
      setAdvisors([]);
    }

    // Fetch clusters
    try {
      const res = await axios.get<Cluster[]>(`${baseURL}/clusters/`);
      setClusters(res.data);
    } catch (err) {
      console.error('❌ Error fetching clusters:', err);
      setClusters([]);
    }

    // Fetch students
    try {
      const res = await axios.get<Student[]>(`${baseURL}/students/`);
      setStudents(res.data);
    } catch (err) {
      console.error('❌ Error fetching students:', err);
      setStudents([]);
    }

    setLoading(false);
  };

  // Create advisor
  const createAdvisor = async (payload: Omit<Advisor, 'id'>): Promise<Advisor> => {
    setLoading(true);
    try {
      const response = await apiCreateAdvisor(payload);
      setAdvisors(prev => [...prev, response.data]);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Update advisor
  const updateAdvisor = async (id: number, payload: Omit<Advisor, 'id'>): Promise<Advisor> => {
    setLoading(true);
    try {
      const response = await apiUpdateAdvisor(id, payload);
      setAdvisors(prev => prev.map(a => a.id === id ? response.data : a));
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Delete advisor
  const deleteAdvisor = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await apiDeleteAdvisor(id);
      setAdvisors(prev => prev.filter(a => a.id !== id));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ClusteringContext.Provider value={{
      clusters,
      students,
      advisors,
      availableClusters,
      loading,
      reloadData: fetchData,
      createAdvisor,
      updateAdvisor,
      deleteAdvisor,
    }}>
      {children}
    </ClusteringContext.Provider>
  );
};
