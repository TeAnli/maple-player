import { EventSystem, EventType } from "./system";
import { Task, useDownloadStore } from "../store/download";

export function load() {
  const eventSystem = EventSystem.getInstance();

  eventSystem.subscribe(EventType.DOWNLOAD, event => {
    const downloadStore = useDownloadStore.getState();
    let data = event.payload;
    downloadStore.updateQueue([data]);
  });
}
