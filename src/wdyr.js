import React from 'react';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('why-did-you-render');
  if (whyDidYouRender && typeof whyDidYouRender === 'function') {
    whyDidYouRender(React, {
      trackAllPureComponents: true,
      trackHooks: true,
      logOwnerReasons: true,
      collapseGroups: true,
      include: [/./], // 追踪所有组件
    });
  } else if (whyDidYouRender && whyDidYouRender.default && typeof whyDidYouRender.default === 'function') {
    whyDidYouRender.default(React, {
      trackAllPureComponents: true,
      trackHooks: true,
      logOwnerReasons: true,
      collapseGroups: true,
      include: [/./], // 追踪所有组件
    });
  }
}
