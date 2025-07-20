import React from 'react';
import {
    Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart,
} from 'recharts';

const data = [
    { yearLevel: '1st Year', students: 150, percentage: 35 },
    { yearLevel: '2nd Year', students: 120, percentage: 28 },
    { yearLevel: '3rd Year', students: 100, percentage: 23 },
    { yearLevel: '4th Year', students: 60, percentage: 14 },
];

const StudentsPerLevel: React.FC = () => {
    return (
        <div className='h-full w-full mt-4'>
            <h2 className='text-center font-bold text-[#1F2937] mb-3'>
            Number of Students per Year Level
            </h2>
            <ResponsiveContainer>
            <ComposedChart data={data}>
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis
                    dataKey="yearLevel"
                    label={{
                        value: 'Year Level',
                        position: 'insideBottom',
                        offset: 2,
                        dy: 4,
                        style: { textAnchor: 'middle', fontSize: 12, fontWeight: 'bold', fill: '#1F2937' },
                    }}
                    tick={{ fontSize: 12, fontWeight: 'bold', fill: '#9F9F9F' }}
                />
                <YAxis
                    yAxisId="left"
                    label={{
                        value: 'Number of Students',
                        angle: -90,
                        position: 'insideLeft',
                        dx: 6,
                        style: { textAnchor: 'middle', fontSize: 12, fontWeight: 'bold', fill: '#1F2937' },
                    }}
                    tick={{ fontSize: 12, fontWeight: 'bold', fill: '#9F9F9F' }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                        value: 'Percentage (%)',
                        angle: 90,
                        position: 'insideRight',
                        dx: -6,
                        style: { textAnchor: 'middle', fontSize: 12, fontWeight: 'bold', fill: '#1F2937' },
                    }}
                    tick={{ fontSize: 12, fontWeight: 'bold', fill: '#9F9F9F' }}
                />
                <Tooltip />
                <Bar
                    yAxisId="left"
                    dataKey="students"
                    name="Number of Students"
                    fill="#1E40AF"
                    barSize={50}
                    radius={[10, 10, 0, 0]}
                />
                <Line
                    yAxisId="right"
                    type="linear"
                    dataKey="percentage"
                    name="Percentage (%)"
                    stroke="#EF4444"
                    strokeWidth={4}
                    dot={{ r: 4, stroke: '#EF4444', strokeWidth: 8, fill: '#EF4444' }}
                />
            </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StudentsPerLevel;