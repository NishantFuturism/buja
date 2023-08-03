import React from 'react';
import NextLink from 'next/link';

const CustomLink = ({ children, href, ...props }) => {
  // If the href is undefined, we'll use "#" as the fallback
  const linkHref = href || '#';

  // Pass the rest of the props to the anchor element
  return (
    <NextLink href={linkHref} {...props}>
      <a>{children}</a>
    </NextLink>
  );
};

export default CustomLink;