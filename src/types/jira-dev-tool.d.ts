// 为 jira-dev-tool 添加类型声明
declare module "jira-dev-tool" {
  export function loadDevTools(callback: () => void): void;
}