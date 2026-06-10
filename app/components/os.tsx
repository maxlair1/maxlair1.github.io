'use client';
import clsx from 'clsx';
import * as React from 'react';

export interface osProps {
    children: React.ReactNode;
}

export function OS({children}: osProps) {
    const [hovering, setHovering] = React.useState<boolean>();

    return (
        <div className='relative py-2 pr-2 pl-8 h-screen bg-taupe-950'>
            <div
                className={clsx(
                    hovering ? 'w-70 bg-muted/5' : 'w-8',
                    'group absolute inset-y-2 text-card left-0 z-10 flex flex-col justify-center items-center rounded-r-lg transition-all ease-bounce'
                )}
                onMouseOver={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {/* Grip */}
                <div 
                className={clsx(
                    hovering ? 'opacity-0 pointer-none:' : 'opacity-100',
                    'w-1 h-8 bg-taupe-500/50 rounded-full'
                )}
                aria-hidden></div>

                {hovering && <Menu/>}
            </div>
            <div className='h-full flex flex-col rounded-lg overflow-hidden bg-black'>
                <div className='flex-1 min-h-0 overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}

function Menu() {
    return (
        <div>
            <p>title</p>
            <div className='text-muted-foreground'>subtitle</div>
        </div>
    )
}
