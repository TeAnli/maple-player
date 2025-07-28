import { listen } from "@tauri-apps/api/event";
import { load } from "./manager";

export enum EventType {
  DOWNLOAD_PROGRESS = "download_progress"
}
type EventHandler = (event: any) => void;

export class EventSystem {
  private events: Map<EventType, EventHandler> = new Map();
  private static instance: EventSystem;

  public static getInstance() {
    if (!EventSystem.instance) EventSystem.instance = new EventSystem();
    return EventSystem.instance;
  }
  public loadEventHandler() {
    load();
  }
  public handle_all() {
    for (const [type, handler] of this.events) {
      listen(type, handler);
    }
  }
  public subscribe(type: EventType, handler: EventHandler) {
    this.events.set(type, handler);
  }
  public unsubscribe(type: EventType) {
    this.events.delete(type);
  }
}
