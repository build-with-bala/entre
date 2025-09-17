import Image from 'next/image';
import type { SVGProps } from "react";

export const Icons = {
  logo: (props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) => (
    <Image 
      src="/logo1.png" 
      alt="Askify Logo"
      width={24}
      height={24}
      {...props} 
      style={{ filter: 'brightness(0) saturate(100%) invert(43%) sepia(87%) saturate(952%) hue-rotate(187deg) brightness(86%) contrast(88%)' }}
    />
  ),
};
