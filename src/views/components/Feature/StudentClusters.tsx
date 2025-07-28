import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { ClusteringContext, type StudentClustersData } from '../../../contexts/clustering';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

// Define the available secondary features and their display names/ranges
// IMPORTANT: These yMin/yMax values should now reflect the *scaled* data range (typically -3 to 3 or -4 to 4)
// as the data coming from the backend (ProcessedStudent fields) is already scaled.
const secondaryFeatureOptions = [
    { key: 'financial_status', label: 'Family Financial Status', yMin: -3, yMax: 3, tooltipLabel: 'Scaled Financial Status' },
    { key: 'workload_rating', label: 'Workload Rating', yMin: -3, yMax: 3, tooltipLabel: 'Scaled Workload Rating' },
    { key: 'help_seeking', label: 'Help Seeking Behavior', yMin: -3, yMax: 3, tooltipLabel: 'Scaled Help Seeking' },
    { key: 'hobby_count', label: 'Hobby Count', yMin: -3, yMax: 3, tooltipLabel: 'Scaled Hobby Count' },
    { key: 'personality', label: 'Personality Type', yMin: -3, yMax: 3, tooltipLabel: 'Scaled Personality' },
    { key: 'birth_order', label: 'Birth Order', yMin: -3, yMax: 3, tooltipLabel: 'Scaled Birth Order' },
    { key: 'has_external_responsibilities', label: 'External Responsibilities', yMin: -3, yMax: 3, tooltipLabel: 'Scaled External Responsibilities' },
];

const StudentClusters: React.FC = () => {
    const context = useContext(ClusteringContext);
    const [selectedFeatureKey, setSelectedFeatureKey] = useState<string>('financial_status');

    if (!context) {
        throw new Error('StudentClusters must be used within a ClusteringProvider');
    }

    const { studentClustersData, graphDataLoading, fetchGraphDataByType, lastFetchedClusterFeature } = context;

    const currentFeature = secondaryFeatureOptions.find(opt => opt.key === selectedFeatureKey);

    useEffect(() => {
        if (!graphDataLoading) {
            if (studentClustersData.datasets.length === 0 || selectedFeatureKey !== lastFetchedClusterFeature) {
                console.log(`DEBUG: Fetching student clusters for feature: ${selectedFeatureKey}`);
                fetchGraphDataByType('student_clusters', selectedFeatureKey);
            }
        }
    }, [selectedFeatureKey, graphDataLoading, fetchGraphDataByType, studentClustersData.datasets.length, lastFetchedClusterFeature]);

    if (graphDataLoading && studentClustersData.datasets.length === 0) {
        return <div className="text-center py-4">Loading Student Clusters data...</div>;
    }

    if (studentClustersData.datasets.length === 0) {
        return <div className="text-center py-4 text-gray-500">No Student Clusters data available.</div>;
    }

    // Chart.js options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Student Clusters: Academic Performance vs. ${currentFeature?.label || 'Selected Feature'}`,
                color: '#1F2937',
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
                padding: {
                    bottom: 24,
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        const xValue = context.parsed.x;
                        const yValue = context.parsed.y;
                        const label = context.dataset.label;
                        const yLabel = currentFeature?.tooltipLabel || 'Value';
                        // Format values to a couple of decimal places for scaled data
                        return `${label}: Scaled GPA ${xValue.toFixed(2)}, ${yLabel} ${yValue.toFixed(2)}`;
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'linear' as const,
                title: {
                    display: true,
                    text: 'Scaled Academic Performance', // Updated label
                    color: '#1F2937',
                    font: {
                        weight: 'bold' as const,
                        size: 12,
                    },
                },
                min: -3, // Changed from 0
                max: 3,  // Changed from 100
                ticks: {
                    display: true,
                    callback: function(value: any) {
                        return `${value.toFixed(1)}`; // Format to 1 decimal place, no %
                    }
                },
            },
            y: {
                type: 'linear' as const,
                title: {
                    display: true,
                    text: currentFeature?.label || 'Selected Feature',
                    color: '#1F2937',
                    font: {
                        weight: 'bold' as const,
                        size: 12,
                    },
                },
                min: currentFeature?.yMin ?? -3,
                max: currentFeature?.yMax ?? 3,
                ticks: {
                    display: true,
                },
            },
        },
    };

    return (
        <div className='h-full w-full mt-4'>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {secondaryFeatureOptions.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => setSelectedFeatureKey(option.key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                                    ${selectedFeatureKey === option.key
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            <div className='h-[400px] w-full'>
                <Scatter data={studentClustersData} options={options} />
            </div>
        </div>
    );
};

export default StudentClusters;
