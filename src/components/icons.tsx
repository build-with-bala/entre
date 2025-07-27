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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 19.5c1.5-1 2.5-3 2.5-5s-1-4-2.5-5" />
      <path d="M4.5 19.5c-1.5-1-2.5-3-2.5-5s1-4 2.5-5" />
      <path d="M12.5 19.5c1.5-1 2.5-3 2.5-5s-1-4-2.5-5" />
      <path d="M12.5 4.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M12.5 24.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M20 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M12.5 22v-15" />
      <path d="M12.5 7a7.5 7.5 0 0 1 7.5 7.5" />
    </svg>
  ),
};
