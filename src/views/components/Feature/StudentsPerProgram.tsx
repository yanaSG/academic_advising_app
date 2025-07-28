import React, { useEffect, useContext } from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { ClusteringContext, type StudentsPerProgramData } from '../../../contexts/clustering'; // Path to your ClusteringContext

// Color palette for the radial chart (keep consistent or fetch from backend)
const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#1e40af', '#FDD654'];

const StudentsPerProgram: React.FC = () => {
    const context = useContext(ClusteringContext);

    if (!context) {
        throw new Error('StudentsPerProgram must be used within a ClusteringProvider');
    }

    const { studentsPerProgramData, graphDataLoading, fetchGraphDataByType } = context;

    useEffect(() => {
        // Fetch data when component mounts or if it's empty and not already loading
        if (studentsPerProgramData.length === 0 && !graphDataLoading) {
            fetchGraphDataByType('students_per_program');
        }
    }, [studentsPerProgramData, graphDataLoading, fetchGraphDataByType]); // Dependencies to re-run effect

    if (graphDataLoading && studentsPerProgramData.length === 0) {
        return <div className="text-center py-4">Loading Students per Program data...</div>;
    }

    if (studentsPerProgramData.length === 0) {
        return <div className="text-center py-4 text-gray-500">No Students per Program data available.</div>;
    }

    return (
        <div className='h-full w-full mt-4'>
            <h2 className='text-center font-bold text-[#1F2937] mb-3'>
            Number of Students per Program
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={studentsPerProgramData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ program, percentage }) => `${program}: ${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="students"
                        nameKey="program"
                    >
                        {studentsPerProgramData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: any, name: any) => {
                            // The 'name' here will be the program name
                            const dataItem = studentsPerProgramData.find(item => item.program === name);
                            if (dataItem) {
                                return [`${value} Students`, `${dataItem.percentage}%`];
                            }
                            return [value, name];
                        }}
                        labelFormatter={(label: any) => `Program: ${label}`}
                    />
                    <Legend
                        formatter={(value: string) => {
                            // Optional: Shorten program names for legend if desired
                            switch(value) {
                                case 'Computer Science': return 'CS';
                                case 'Information Technology': return 'IT';
                                case 'Information Systems': return 'IS';
                                case 'Game Development': return 'GD';
                                case 'Entertainment & Multimedia Computing': return 'EMC';
                                case 'Associate in Computer Technology': return 'ACT';
                                default: return value;
                            }
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StudentsPerProgram;
