import * as React from 'react';
import { useEffect } from 'react';

import { cn } from 'src/common/helpers/helpers';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, forwardedRef) => {
  const { className, ...otherProps } = props;

  const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
  const combinedRef = forwardedRef
    ? (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }
    : internalRef;

  useEffect(() => {
    const textarea = internalRef.current;
    if (textarea) {
      const previousScrollTop = window.scrollY + 1000;

      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;

      window.scrollTo(0, previousScrollTop);
    }
  }, [props.value]);

  return (
    <textarea
      className={cn(
        'resize-none overflow-hidden',
        'flex min-h-[80px] w-full rounded-md border border-grey bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-blue font-semibold disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={combinedRef}
      {...otherProps}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
