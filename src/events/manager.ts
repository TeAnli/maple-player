import { EventSystem, EventType } from "./system";
import { Task, useProgressStore } from "../store/download";
import { useMusicStore } from "../store/music";

export function load() {
  const eventSystem = EventSystem.getInstance();
  eventSystem.subscribe(EventType.DOWNLOAD_PROGRESS, event => {
    const progressStore = useProgressStore.getState();
    const queue = event.payload as Task[];
    if (queue.length === 0) {
      progressStore.setCurrent(0);
      progressStore.setTotal(0);
      progressStore.setQueue([]);
    } else {
      const current = queue[0].progress.current_size;
      const total = queue[0].progress.total_size;
      progressStore.setCurrent(current);
      progressStore.setTotal(total);
      progressStore.setQueue(queue);
    }
  });
  eventSystem.subscribe(EventType.MUSIC_PROGRESS, event => {
    const state = useMusicStore.getState();
    if (event.payload === "max") {
      state.setProgress(0);
    } else {
      state.setProgress(event.payload);
    }
  });
}
