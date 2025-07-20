import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const data = {
    datasets: [
        {
            label: 'High Achievers',
            data: [
                { x: 82, y: 8.2 }, { x: 88, y: 8.8 }, { x: 90, y: 9.2 }, { x: 87, y: 8.7 },
                { x: 95, y: 9.5 }, { x: 89, y: 8.9 }, { x: 91, y: 9.1 }, { x: 86, y: 8.6 },
                { x: 93, y: 9.3 }, { x: 85, y: 8.4 }, { x: 87, y: 8.8 }, { x: 92, y: 9.6 },
                { x: 84, y: 8.5 }, { x: 94, y: 9.0 }, { x: 83, y: 8.1 }, { x: 96, y: 9.7 },
                { x: 81, y: 7.9 }, { x: 90, y: 8.8 }, { x: 88, y: 9.4 }, { x: 97, y: 9.8 },
            ],
            backgroundColor: '#10B981',
            pointRadius: 4,
        },
        {
            label: 'Struggling Students',
            data: [
                { x: 55, y: 2.5 }, { x: 62, y: 2.8 }, { x: 68, y: 3.5 }, { x: 52, y: 1.8 },
                { x: 70, y: 4.2 }, { x: 64, y: 3.0 }, { x: 58, y: 2.2 }, { x: 67, y: 3.8 },
                { x: 51, y: 1.5 }, { x: 66, y: 3.1 }, { x: 72, y: 4.5 }, { x: 50, y: 1.2 },
                { x: 65, y: 3.4 }, { x: 59, y: 2.6 }, { x: 71, y: 4.1 }, { x: 54, y: 2.0 },
                { x: 49, y: 1.0 }, { x: 69, y: 3.9 }, { x: 63, y: 2.9 }, { x: 73, y: 4.8 },
                { x: 56, y: 2.3 }, { x: 74, y: 4.6 }, { x: 48, y: 0.8 }, { x: 61, y: 3.2 },
            ],
            backgroundColor: '#EF4444',
            pointRadius: 4,
        },
        {
            label: 'Creative & Artistic',
            data: [
                { x: 70, y: 5.8 }, { x: 75, y: 6.2 }, { x: 80, y: 6.8 }, { x: 85, y: 7.5 },
                { x: 72, y: 5.5 }, { x: 79, y: 6.7 }, { x: 77, y: 6.3 }, { x: 84, y: 7.2 },
                { x: 68, y: 5.2 }, { x: 83, y: 7.1 }, { x: 76, y: 6.6 }, { x: 74, y: 6.0 },
                { x: 81, y: 6.9 }, { x: 71, y: 5.6 }, { x: 73, y: 5.9 }, { x: 86, y: 7.8 },
                { x: 69, y: 5.3 }, { x: 82, y: 7.0 }, { x: 65, y: 4.9 }, { x: 87, y: 8.0 },
                { x: 78, y: 6.4 }, { x: 67, y: 5.1 }, { x: 88, y: 8.2 }, { x: 64, y: 4.6 },
            ],
            backgroundColor: '#F59E0B',
            pointRadius: 4,
        },
        {
            label: 'Athletic & Social',
            data: [
                { x: 68, y: 6.8 }, { x: 77, y: 7.5 }, { x: 72, y: 6.9 }, { x: 80, y: 8.1 },
                { x: 66, y: 6.5 }, { x: 76, y: 7.3 }, { x: 71, y: 6.8 }, { x: 82, y: 8.5 },
                { x: 74, y: 7.2 }, { x: 79, y: 7.8 }, { x: 69, y: 6.6 }, { x: 83, y: 8.7 },
                { x: 65, y: 6.2 }, { x: 78, y: 7.6 }, { x: 73, y: 7.0 }, { x: 84, y: 8.9 },
                { x: 67, y: 6.4 }, { x: 81, y: 8.2 }, { x: 70, y: 6.7 }, { x: 85, y: 9.1 },
                { x: 75, y: 7.4 }, { x: 64, y: 6.0 }, { x: 86, y: 9.3 }, { x: 63, y: 5.8 },
            ],
            backgroundColor: '#2563EB',
            pointRadius: 4,
        },
        {
            label: 'Tech Enthusiasts',
            data: [
                { x: 79, y: 7.5 }, { x: 86, y: 8.4 }, { x: 83, y: 8.0 }, { x: 90, y: 9.2 },
                { x: 77, y: 7.2 }, { x: 82, y: 7.8 }, { x: 88, y: 8.8 }, { x: 91, y: 9.5 },
                { x: 76, y: 6.9 }, { x: 85, y: 8.2 }, { x: 89, y: 9.0 }, { x: 92, y: 9.7 },
                { x: 75, y: 6.6 }, { x: 87, y: 8.6 }, { x: 93, y: 9.8 }, { x: 78, y: 7.1 },
                { x: 74, y: 6.3 }, { x: 94, y: 9.9 }, { x: 80, y: 7.6 }, { x: 95, y: 9.6 },
            ],
            backgroundColor: '#8B5CF6',
            pointRadius: 4,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { 
            display: true,
            position: 'right' as const,
            labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                    size: 11,
                    weight: 'bold' as const,
                },
                color: '#1F2937',
            },
        },
        title: {
            display: true,
            text: 'Student Clusters Analysis',
            align: "center" as const,
            color: '#1F2937',
            font: {
                weight: 'bold' as const,
                size: 16,
            },
            padding: {
                bottom: 24,
            },
        },
        tooltip: {
            callbacks: {
                label: function(context: any) {
                    return `${context.dataset.label}: GPA ${context.parsed.x}%, Financial Status ${context.parsed.y}/10`;
                },
            },
        },
    },
    scales: {
        x: {
            type: 'linear' as const,
            title: { 
                display: true, 
                text: 'Academic Performance (%)', 
                color: '#1F2937',
                font: {
                    weight: 'bold' as const,
                    size: 12,
                }, 
            },
            min: 50,
            max: 100,
            ticks: {
                stepSize: 10,
            },
        },
        y: {
            title: { 
                display: true, 
                text: 'Family Financial Status (1-10)',
                color: '#1F2937',
                font: {
                    weight: 'bold' as const,
                    size: 12,
                }, 
            },
            min: 0,
            max: 10,
            ticks: {
                stepSize: 1,
            },
        },
    },
};

const StudentClusters: React.FC = () => {
    return (
        <div className="h-full w-full flex gap-2">
            <Scatter data={data} options={options} />
        </div>
    );
};

export default StudentClusters;
