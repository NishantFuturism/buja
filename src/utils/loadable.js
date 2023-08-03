import React, { lazy, Suspense } from 'react';
import { Offline } from "react-detect-offline";
const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);
  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
      <Offline >Only shown offline (surprise!)</Offline>
    </Suspense>
  );
};
export default loadable;
