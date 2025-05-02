
import React from 'react';

// Simple inline SVG for WhatsApp icon
export function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor" // Use currentColor to inherit color from parent
      stroke="none" // No stroke
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Pass other props like className
    >
      <path d="M16.75 13.96c.27.13.53.2.79.2.26 0 .52-.07.78-.2.4-.19.6-.6.4-.99-.39-.8-.83-1.56-1.32-2.28-.13-.19-.33-.3-.54-.3-.21 0-.41.11-.54.3-.49.72-.93 1.48-1.32 2.28-.2.39 0 .8.41.99zm-4.61 4.44c.53.19.96.46 1.49.64.13.05.26.07.4.07.13 0 .26-.02.39-.07.53-.18.96-.45 1.49-.64.39-.14.83-.07 1.14.19.31.26.5.64.5.99 0 .79-.53 1.46-1.32 1.72-.89.28-1.86.28-2.75 0-.79-.26-1.32-.93-1.32-1.72 0-.35.19-.73.5-.99.31-.25.75-.33 1.14-.18zM12 2a10 10 0 0 0-9.94 8.96c0 1.6.39 3.17 1.14 4.58l-1.8 6.47a.5.5 0 0 0 .63.63l6.47-1.8c1.4.75 2.98 1.14 4.58 1.14h.02a10 10 0 1 0-1.07-19.98zM12 20.5a8.5 8.5 0 0 1-4.34-1.25.5.5 0 0 0-.47-.06l-4.6 1.28 1.28-4.6a.5.5 0 0 0-.06-.47A8.5 8.5 0 1 1 12 20.5z" />
    </svg>
  );
}
