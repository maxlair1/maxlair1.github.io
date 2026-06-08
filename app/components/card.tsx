import * as React from "react";

interface CardProps {
    children?: React.ReactNode,
    title?: string,
    subtitle?: string,
    href?: string,
    newWindow?: boolean
}

export function Card({children, title, subtitle, href, newWindow = false}: CardProps): React.ReactElement {
    return (
        <a href={href} target={newWindow ? "_blank" : '_self'} className={`${href && 'dark:hover:bg-taupe-900/50 hover:bg-taupe-200 cursor-pointer'} -mx-3 flex flex-col rounded-md mb-0 px-3 no-underline sm:py-3`}>
                <h1 className="font-medium dark:text-taupe-100 text-taupe-950">{title}</h1>
                <p className="text-taupe-500 dark:text-taupe-400 font-normal">{subtitle}</p>
                {children}
        </a>
    )
}