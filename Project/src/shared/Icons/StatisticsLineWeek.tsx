import React from 'react';
import { IIconProps } from './Icons';

export function StatisticsLineWeek({ size, className }: IIconProps) {
    return (
        <svg
            className={className}
            width={size || '843'}
            height={size || '1'}
            viewBox="0 0 843 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.2" width="843" height="1" fill="#333333" />
        </svg>
    );
}