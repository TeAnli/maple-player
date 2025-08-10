import { info } from "@tauri-apps/plugin-log";
/**
 * 顺序执行代码并输出日志
 * @param taskName 任务名称
 * @param callback 要执行的代码
 */
function loadTaskLog(taskName: string, callback: () => void): void {
  info(`任务正在加载: ${taskName}`);
  callback();
  info(`任务加载完成: ${taskName}`);
}

export { loadTaskLog };
