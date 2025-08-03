import React, { useEffect, useContext, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { ClusteringContext } from '../../../contexts/clustering';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const PC_OPTIONS = [
    { value: 1, label: 'PC1: Learning Style Spectrum' },
    { value: 2, label: 'PC2: Family Structure Impact' },
    { value: 3, label: 'PC3: Personality-Driven Engagement' },
    { value: 4, label: 'PC4: Help-Seeking & Independence' },
    { value: 5, label: 'PC5: Academic Pressure & Coping' },
    { value: 6, label: 'PC6: External Responsibilities & Family Dynamics' },
    { value: 7, label: 'PC7: Engaged Hands-On Learners' },
    { value: 8, label: 'PC8: Academic Struggle Profile' },
    { value: 9, label: 'PC9: Hobby-Academic Balance Tension' },
    { value: 10, label: 'PC10: Workload Perception vs. Reality' },
    { value: 11, label: 'PC11: Family Dynamics & Academic Support' },
];

const StudentCluster: React.FC = () => {
    const context = useContext(ClusteringContext);
    const [pcX, setPcX] = useState<number>(1);
    const [pcY, setPcY] = useState<number>(2);

    if (!context) throw new Error('StudentCluster must be used within a ClusteringProvider');

    const { studentClustersData, graphDataLoading, fetchGraphDataByType } = context;

    useEffect(() => {
        fetchGraphDataByType('pca_scatter', `pc_x=${pcX}&pc_y=${pcY}`);
    }, [pcX, pcY]);

    if (graphDataLoading && studentClustersData.datasets.length === 0) {
        return <div className="text-center py-4">Loading PCA Scatter data...</div>;
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Student Clusters: PC${pcX} vs PC${pcY}`,
                color: '#1F2937',
                font: { size: 16, weight: 'bold' as const },
                padding: { bottom: 24 },
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const xValue = context.parsed.x;
                        const yValue = context.parsed.y;
                        const label = context.dataset.label;
                        return `${label}: X=${xValue.toFixed(2)}, Y=${yValue.toFixed(2)}`;
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'linear' as const,
                title: {
                    display: true,
                    text: `PC${pcX}`,
                    color: '#1F2937',
                    font: { weight: 'bold' as const, size: 12 },
                },
            },
            y: {
                type: 'linear' as const,
                title: {
                    display: true,
                    text: `PC${pcY}`,
                    color: '#1F2937',
                    font: { weight: 'bold' as const, size: 12 },
                },
            },
        },
    };

    return (
        <div className="h-full w-full flex flex-col gap-2">
            {/* Full-width dropdowns side-by-side */}
            <div className="flex gap-4 mb-2 w-full">
                <div className="flex flex-col flex-1 min-w-0">
                    <label className="block mb-1 font-semibold text-gray-700">X-axis</label>
                    <select
                        value={pcX}
                        onChange={(e) => setPcX(Number(e.target.value))}
                        className="px-3 py-2 border rounded-md w-full"
                    >
                        {PC_OPTIONS.map(pc => (
                            <option key={pc.value} value={pc.value}>{pc.label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <label className="block mb-1 font-semibold text-gray-700">Y-axis</label>
                    <select
                        value={pcY}
                        onChange={(e) => setPcY(Number(e.target.value))}
                        className="px-3 py-2 border rounded-md w-full"
                    >
                        {PC_OPTIONS.map(pc => (
                            <option key={pc.value} value={pc.value}>{pc.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Scatterplot fills remaining space without overflow */}
            <div className="flex-1 min-h-0">
                <Scatter data={studentClustersData} options={options} />
            </div>
        </div>
    );
};

export default StudentCluster;
