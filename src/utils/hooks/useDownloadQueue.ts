import { Status, useDownloadStore } from "@/store/download";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

// export function useDownloadQueue() {
//   const { updateQueue, queue } = useDownloadStore(
//     useShallow(state => ({
//       updateQueue: state.updateQueue,
//       queue: state.queue
//     }))
//   );

//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     const nextTaskIndex = queue.findIndex(task => task.status === Status.PENDING);

//     if (nextTaskIndex !== -1) {
//       const task = queue[nextTaskIndex];
//       task.status = Status.DOWNLOADING;

//       const newQueue = queue.map((task, index) =>
//         index === nextTaskIndex ? { ...task, status: Status.DOWNLOADING } : task
//       );
//       updateQueue(newQueue);
//     }
//     setActive(prev => prev + 1);

//     const fetch = () => {

//     };
//   }, []);
//   return [push, active];
// }
