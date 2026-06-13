'use client';
import clsx from 'clsx';
import * as React from 'react';

export interface osProps {
    children: React.ReactNode;
}

export function OS({children}: osProps) {
    const [hovering, setHovering] = React.useState<boolean>();

    return (
        <div className='relative py-1 pr-1 pl-8 h-screen bg-black'>
            <div
                className={clsx(
                    hovering ? 'w-70 bg-black border-muted/50' : 'w-8',
                    'group absolute inset-y-1 left-0 z-10 flex flex-col justify-center items-center transition-all ease-bounce duration-300'
                )}
                onMouseOver={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                {/* Grip */}
                <div 
                className={clsx(
                    hovering ? 'opacity-0 pointer-none select-none' : 'opacity-100',
                    'w-1 h-8 bg-muted rounded-full'
                )}
                aria-hidden></div>

                {hovering && <Menu/>}
            </div>
            <div className='h-full relative flex flex-col rounded-lg overflow-hidden bg-black'>
                <div className='flex-1 min-h-0 overflow-y-auto'>
                    {hovering && 
                    <div aria-hidden className={clsx(
                        'absolute top-0 left-0 right-0 bottom-0 pointer-none select-none bg-black/25 transition-std ease-bounce duration-200',
                        hovering ? 'opacity-100' : 'opacity-0'
                    )}/>
                    }
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
