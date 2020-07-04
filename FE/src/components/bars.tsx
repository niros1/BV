import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Legend, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts"
import { IImage } from '../model/models';

export const BVBarChart: React.FunctionComponent<{ emotionsRadarStruct: any, userImages: IImage[], selectedId: string | undefined }> = ({ emotionsRadarStruct, userImages, selectedId }) => {
    const getFillColor = () => {
        return ("#" + Math.floor(Math.random() * 16777215).toString(16));
    }

    const getOpacity = (id: string): number => {
        if (!selectedId) {
            return 0.6;
        }
        return selectedId === id ? 1 : 0.02;
    }

    return (
        <BarChart width={600} height={300} data={emotionsRadarStruct}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="emotion" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            {
                userImages.map((image, i: number) => {
                    return <Bar stackId="a" key={i} dataKey={image.id} stroke="#8884d8" fill={image.color} fillOpacity={getOpacity(image.id)} />
                })
            }
        </BarChart>
    );
}