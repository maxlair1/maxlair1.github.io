import * as React from 'react';

interface FrameProps {
    children?: React.ReactNode,
    caption?: string,
}

export function Frame({children, caption}: FrameProps) {
    return (
        <figure className=''>
            <div className="mobile-full-width relative mb-8.75 mt-8 rounded-xl border border-taupe-200 dark:border-taupe-800/50 bg-taupe dark:bg-taupe-900/30 sm:shadow-sm sm:dark:shadow-inset-border">
                <div className="flex w-full px-4 py-6 sm:rounded-xl light h-72 items-center justify-center">
                    {children}
                </div>
            </div>
            <figcaption className="-mt-5 mb-8 text-center font-mono text-xs text-taupe-600 dark:text-taupe-400">{caption}</figcaption>
        </figure>
    )
}
