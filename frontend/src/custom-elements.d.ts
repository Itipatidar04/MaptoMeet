import * as React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'spline-viewer': {
          url?: string;
          class?: string;
          className?: string;
          children?: any;
        };
      }
    }
  }
}
