import React, { useEffect, useContext, useState } from 'react';
import {
    Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart,
} from 'recharts';
import { ClusteringContext } from '../../../contexts/clustering';

const StudentsPerLevel: React.FC = () => {
    const context = useContext(ClusteringContext);
    const [initialized, setInitialized] = useState(false);

    if (!context) throw new Error('StudentsPerLevel must be used within a ClusteringProvider');

    const { studentsPerLevelData, graphDataLoading, fetchGraphDataByType } = context;

    useEffect(() => {
        if (!initialized) {
            fetchGraphDataByType('students_per_level');
            setInitialized(true);
        }
    }, [initialized, fetchGraphDataByType]);

    if (graphDataLoading && studentsPerLevelData.length === 0) {
        return <div className="text-center py-4">Loading Students per Year Level data...</div>;
    }

    if (studentsPerLevelData.length === 0) {
        return <div className="text-center py-4 text-gray-500">No Students per Year Level data available.</div>;
    }

    return (
        <div className='h-full w-full mt-4'>
            <h2 className='text-center font-bold text-[#1F2937] mb-3'>
                Number of Students per Year Level
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={studentsPerLevelData}>
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
