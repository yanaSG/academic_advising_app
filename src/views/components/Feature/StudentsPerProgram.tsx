import React from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from 'recharts';

interface ProgramData {
    program: string;
    students: number;
    percentage: number;
}

const data: ProgramData[] = [
    { program: 'Computer Science', students: 180, percentage: 32 },
    { program: 'Information Technology', students: 140, percentage: 25 },
    { program: 'Information Systems', students: 120, percentage: 21 },
    { program: 'Game Development', students: 90, percentage: 16 },
    { program: 'Entertainment & Multimedia Computing', students: 35, percentage: 6 },
    { program: 'Associate in Computer Technology', students: 50, percentage: 6 },
];

// Color palette for the radial chart
const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#1e40af', '#FDD654'];

const StudentsPerProgram: React.FC = () => {
    return (
        <div className='h-full w-full mt-4'>
            <h2 className='text-center font-bold text-[#1F2937] mb-3'>
            Number of Students per Program
            </h2>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ program, percentage }) => `${program}: ${percentage}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="students"
                        nameKey="program"
                        isAnimationActive={true}
                        animationDuration={500}
                        animationEasing="ease-out"
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: any, name: any) => {
                            if (name === 'students') {
                                return [value, 'Students'];
                            }
                            return [value, name];
                        }}
                        labelFormatter={(label: any) => `Program: ${label}`}
                    />
                    <Legend 
                        formatter={(value: string) => {
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