import React from 'react';
import { IIconProps } from './Icons';

export function MenuListBtn({ size, className }: IIconProps) {
    return (
        <svg
            className={className}
            width={size || '26'}
            height={size || '6'}
            viewBox="0 0 26 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
            <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
            <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
        </svg>
    );
}