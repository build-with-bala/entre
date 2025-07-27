import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 0 0-3.92 19.4" />
      <path d="M12.08 22A10 10 0 0 0 22 13.92" />
      <path d="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M14 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M22 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M4 12h5" />
      <path d="M14 2v5" />
      <path d="m19 12-3-3" />
      <path d="m5 14-1 3" />
      <path d="m14 7-1 3" />
      <path d="M19 16-1 3" />
    </svg>
  ),
};
