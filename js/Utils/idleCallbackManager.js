
class S_idleCallbackManager {
    static taskList = [];
    static totalTaskCount = 0;
    static currentTaskNumber = 0;
    static statusRefreshScheduled = false;
    static enqueueTask(taskHandler, taskData) {
        S_idleCallbackManager.taskList.push({
          handler: taskHandler,
          data: taskData,
        });
      
        S_idleCallbackManager.totalTaskCount++;
      
        if (!S_idleCallbackManager.taskHandle) {
          S_idleCallbackManager.taskHandle = requestIdleCallback(S_idleCallbackManager.runTaskQueue, { timeout: 1000 });
        }
      
        S_idleCallbackManager.scheduleStatusRefresh();
    }
    static runTaskQueue(deadline) {
        while (
          (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
          S_idleCallbackManager.taskList.length
        ) {
            console.log(deadline.timeRemaining())
          const task = S_idleCallbackManager.taskList.shift();
          S_idleCallbackManager.currentTaskNumber++;
      
          task.handler(task.data);
          
          console.log(deadline.timeRemaining())
          S_idleCallbackManager.scheduleStatusRefresh();
        }
      
        if (S_idleCallbackManager.taskList.length) {
          S_idleCallbackManager.taskHandle = requestIdleCallback(S_idleCallbackManager.runTaskQueue, { timeout: 1000 });
        } else {
          S_idleCallbackManager.taskHandle = 0;
        }
    }
    static scheduleStatusRefresh() {
        if (!S_idleCallbackManager.statusRefreshScheduled) {
          requestAnimationFrame(S_idleCallbackManager.updateDisplay);
          S_idleCallbackManager.statusRefreshScheduled = true;
        }
    }
    static updateDisplay(){
        console.dir(S_idleCallbackManager)
        S_idleCallbackManager.statusRefreshScheduled = false;
    }
}