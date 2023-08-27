import React, { useCallback } from 'react';

export function useCombinedRefs<T>(...refs: (React.Ref<T> | null)[]): React.Ref<T> {
  const combinedRefs = useCallback((node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  }, refs);
  return combinedRefs;
}
