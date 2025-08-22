import { invoke } from "@tauri-apps/api/core";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useDownloadStore, Status, Task } from "../../store/download";
import { data } from "react-router";
import { useToggle } from "./useToggle";

export function useDownloadQueue() {
  const addTaskToStore = useDownloadStore(state => state.addTask);
  const queue = useDownloadStore(state => state.queue);
  const [status, toggle] = useToggle(false);
  // 添加新任务到队列
  const addTask = (taskId: string, name: string, cover: string) => {
    const newTask: Task = {
      id: taskId,
      status: Status.PENDING,
      name,
      cover,
      progress: {
        total_size: 0,
        current_size: 0
      }
    };
    addTaskToStore(newTask);
  };
  useEffect(() => {
    if (status) {
      const fetch = async () => {
        for (const task of queue) {
          let cid = await invoke("get_cid_by_bvid", { bvid: task.id });
          try {
            await invoke("download", {
              bvid: task.id,
              cid
            });
          } catch (error) {
            console.error(error);
          }
        }
      };
      fetch();
    }
  }, [status]);
  const download = () => {
    toggle();
  };
  return {
    addTask,
    download
  };
}
