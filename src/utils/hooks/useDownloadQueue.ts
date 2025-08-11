import { invoke } from "@tauri-apps/api/core";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useDownloadStore, Status, Task } from "../../store/download";

export function useDownloadQueue() {
  const { addTaskToStore, queue } = useDownloadStore(
    useShallow(state => ({
      addTaskToStore: state.addTask,
      queue: state.queue
    }))
  );
  // 添加新任务到队列
  const addTask = (taskId: string) => {
    const newTask: Task = {
      id: taskId,
      status: Status.PENDING,
      progress: {
        total_size: 0,
        current_size: 0
      }
    };
    addTaskToStore(newTask);

    return newTask;
  };

  const download = async () => {
    console.log(queue);
    for (const task of queue) {
      let cid = await invoke("get_cid_by_bvid", { bvid: task.id });
      console.log(cid);
      await invoke("download", {
        bvid: task.id,
        cid
      });
    }
  };
  return {
    addTask,
    queue,
    download
  };
}
