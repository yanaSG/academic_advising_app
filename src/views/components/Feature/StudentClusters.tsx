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
                { x: 87, y: 8.9 }, { x: 91, y: 8.3 }, { x: 85, y: 9.1 }, { x: 89, y: 8.7 },
                { x: 93, y: 9.4 }, { x: 86, y: 8.5 }, { x: 88, y: 9.0 }, { x: 84, y: 8.8 },
                { x: 90, y: 8.6 }, { x: 92, y: 9.2 },
            ],
            backgroundColor: '#10B981',
            pointRadius: 4,
        },
        {
            label: 'Struggling Students',
            data: [
                { x: 58, y: 2.1 }, { x: 51, y: 2.9 }, { x: 64, y: 1.8 }, { x: 56, y: 3.2 },
                { x: 49, y: 2.5 }, { x: 62, y: 1.4 }, { x: 54, y: 3.0 }, { x: 60, y: 2.7 },
                { x: 52, y: 1.9 }, { x: 65, y: 3.1 }, { x: 57, y: 2.3 }, { x: 63, y: 1.6 },
                { x: 50, y: 2.8 }, { x: 59, y: 2.0 }, { x: 61, y: 3.3 },
            ],
            backgroundColor: '#EF4444',
            pointRadius: 4,
        },
        {
            label: 'Creative & Artistic',
            data: [
                { x: 73, y: 6.2 }, { x: 76, y: 5.7 }, { x: 71, y: 6.5 }, { x: 78, y: 6.0 },
                { x: 72, y: 6.8 }, { x: 75, y: 5.9 }, { x: 74, y: 6.3 }, { x: 77, y: 6.6 },
                { x: 70, y: 5.8 }, { x: 79, y: 6.4 },
            ],
            backgroundColor: '#F59E0B',
            pointRadius: 4,
        },
        {
            label: 'Athletic & Social',
            data: [
                { x: 69, y: 7.1 }, { x: 73, y: 6.8 }, { x: 67, y: 7.4 }, { x: 75, y: 6.9 },
                { x: 71, y: 7.2 }, { x: 68, y: 6.6 }, { x: 74, y: 7.0 }, { x: 66, y: 7.3 },
                { x: 72, y: 6.7 }, { x: 76, y: 7.5 }, { x: 65, y: 6.9 }, { x: 77, y: 7.1 },
                { x: 70, y: 6.8 }, { x: 64, y: 7.2 }, { x: 78, y: 6.5 },
            ],
            backgroundColor: '#2563EB',
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
                display: false,
            },
        },
        y: {
            title: { 
                display: true, 
                text: 'Family Financial Status',
                color: '#1F2937',
                font: {
                    weight: 'bold' as const,
                    size: 12,
                }, 
            },
            min: 0,
            max: 10,
            ticks: {
                display: false,
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
