import { EventSystem, EventType } from "./system";
import { Task, useDownloadStore } from "../store/download";

export function load() {
  const eventSystem = EventSystem.getInstance();

  eventSystem.subscribe(EventType.DOWNLOAD, event => {
    const downloadStore = useDownloadStore.getState();
    let data = event.payload as Task;

    // 检查是否下载完成（total_size 等于 current_size）
    const isCompleted = data.progress.total_size > 0 && 
      data.progress.total_size === data.progress.current_size;

    let newQueue;
    if (isCompleted) {
      // 从队列中移除任务
      newQueue = downloadStore.queue.filter(task => task.id !== data.id);
      console.info(`Download completed, removed task: ${data.id}`);
    } else {
      // 更新任务进度
      newQueue = downloadStore.queue.map(task =>
        task.id === data.id ? { ...task, progress: data.progress } : task
      );
    }

    downloadStore.updateQueue(newQueue);
  });
}
