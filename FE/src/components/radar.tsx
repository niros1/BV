import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis
} from "recharts"
import { IImage } from '../model/models';

export const BVRadar: React.FunctionComponent<{ emotionsRadarStruct: any, userImages: IImage[], selectedId: string | undefined }> = ({ emotionsRadarStruct, userImages, selectedId }) => {
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
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={emotionsRadarStruct}>
            <PolarGrid />
            <PolarAngleAxis dataKey="emotion" />
            <PolarRadiusAxis />
            {
                userImages.map((image, i: number) => {
                    return <Radar name={image.name} key={i} dataKey={image.id} stroke="#8884d8" fill={image.color} fillOpacity={getOpacity(image.id)} />
                })
            }
        </RadarChart>
    );
}