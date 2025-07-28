import { info } from "@tauri-apps/plugin-log";

type Formatter = (timestamp: Date, message: any) => string;

const formatter: Formatter = (timestamp, message) => {
  return `${timestamp.toISOString()} ${message}`;
};

function loadTaskLog(taskName: string, callback: () => void): void {
  info(formatter(new Date(), `任务正在加载: ${taskName}`));
  callback();
  info(formatter(new Date(), `任务加载完成: ${taskName}`));
}

export { loadTaskLog };
