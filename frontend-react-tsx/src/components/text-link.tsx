import { cn, resolveUrl } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import type { RouteDefinition } from '@/wayfinder';

type BaseProps = Omit<ComponentProps<typeof Link>, 'href'>;
type LinkProps = BaseProps & { href: string | RouteDefinition<any> };

export default function TextLink({
    className = '',
    children,
    href,
    ...props
}: LinkProps) {
    return (
        <Link
            className={cn(
                'text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500',
                className,
            )}
            href={resolveUrl(href)}
            {...props}
        >
            {children}
        </Link>
    );
}
