// 为 jira-dev-tool 添加类型声明
declare module "jira-dev-tool" {
  import React from 'react';
  
  // DevTools组件类型
  export const DevTools: React.FC;
  
  // loadServer函数类型
  export function loadServer(callback: () => void): void;
}