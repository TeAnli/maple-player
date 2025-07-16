import { EventSystem, EventType } from "./event_system";
import { Task, useProgressStore } from "../store/download_store";

export function load() {
  const eventSystem = EventSystem.getInstance();
  eventSystem.subscribe(EventType.DOWNLOAD_PROGRESS, (event) => {
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
}
