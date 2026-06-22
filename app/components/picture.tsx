'use client';
import clsx from 'clsx';
import * as React from 'react';

interface PictureProps {
    src: string;
    alt?: string;
    frame: boolean;
    caption?: string;
    onLoad: () => void;
}

export function Picture({
    src,
    alt,
    frame,
    caption
}:PictureProps) {

    return (
        <figure>
            <div className={clsx(
                'rounded-2xl overflow-hidden bg-card',
                frame && ' p-2 border'
            )}>

                <img className=' rounded-xl border overflow-hidden'
                src={src} alt={alt ?? src} />
            </div>
            {caption && <figcaption className='text-sm text-muted-foreground text-center my-2 italic'>
                {caption}
            </figcaption>}
        </figure>
    )
}