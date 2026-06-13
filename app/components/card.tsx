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
        <a role="anchor" href={href} target={newWindow ? "_blank" : '_self'} className={`${href && 'hover:bg-accent/50 transition-all duration-100 ease-std cursor-pointer'} -mx-3 flex flex-col rounded-md mb-0 px-3 no-underline sm:py-3`}>
                <h1 className="font-medium text-foreground">{title}</h1>
                <p className="text-muted-foreground font-normal">{subtitle}</p>
                {children}
        </a>
    )
}