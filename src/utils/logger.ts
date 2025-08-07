import { info } from "@tauri-apps/plugin-log";

type Formatter = (timestamp: Date, message: any) => string;

const formatter: Formatter = (timestamp, message) => {
  return `${timestamp.toISOString()} ${message}`;
};

/**
 * 顺序执行代码并输出日志
 * @param taskName 任务名称
 * @param callback 要执行的代码
 */
function loadTaskLog(taskName: string, callback: () => void): void {
  info(formatter(new Date(), `任务正在加载: ${taskName}`));
  callback();
  info(formatter(new Date(), `任务加载完成: ${taskName}`));
}

export { loadTaskLog };
