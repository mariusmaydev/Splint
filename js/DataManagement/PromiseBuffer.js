
class S_PromiseBuffer {

}
// // The buffering function
// const bufferPromise = (asyncFuntion, maxCount) => {
    
//     // Keeps track of the number of currently running tasks
//     let activeCount = 0;

//     // Keeps track of waiting tasks (in the format { args, resolve, reject })
//     const queue = [];



//     // Enqueue the task or run it immediately
//     const enqueueTask = (task) => {

//         // If activeCount is less than maxCount
//         // We can run more tasks than we do now
//         if (activeCount < maxCount) {

//             // Increase the counter
//             activeCount++;

//             // Run the new task immediately
//             runTask(task);

//         // We are running as many tasks as we can
//         } else {

//             // Put this new task into the queue
//             queue.push(task);
//         }
//     };


//     // Run the task
//     const runTask = (task) => {

//         // Run the async funtion
//         asyncFuntion(task.args)

//             // If successful resolve our promise as well
//             .then(task.resolve)

//             // If unsuccessful reject our promise as well
//             .catch(task.reject)

//             // When the task finishes (fails or succeeds) try to start the next task
//             .finally(startNextTask);
//     };


//     // Tries to start the next task in the queue
//     const startNextTask = () => {

//         // Get the first element of an array
//         const nextTask = queue.shift();


//         // If it's truey
//         // There is actually another task to run
//         if (nextTask) {

//             // Run that task
//             runTask(nextTask);

//         // There is no other task to run
//         } else {

//             // Decrease the counter
//             activeCount--;
//         }
//     };



//     // Return a funtion
//     // which creates the task object and enqueues it
//     // and wraps it all up in a promise
//     return (args) => new Promise((resolve, reject) => enqueueTask({args, resolve, reject}));
// }




// // == TESTING ==

// // Async logging function for testing
// // it logs the start, waits 2 seconds, logs the end and then resolves
// async function waitingConsoleFunction(item){
//     new Promise(function(resolve, reject) {

//         console.log("Started", item);

//         setTimeout(() => { 
//             console.log("Resolved", item);
//             resolve(item) 
//         }, 200);
//     });
// };
// // const waitingConsoleFunction = (item) => new Promise((resolve, reject) => {

// //     console.log("Started", item);

// //     setTimeout(() => { 
// //         console.log("Resolved", item);
// //         resolve(item) 
// //     }, 200);

// // });
// bufferPromise(waitingConsoleFunction, 2)
// bufferPromise(waitingConsoleFunction, 2);;
// // Testing the buffering funtion
// async function mappingFunction(){
//     return bufferPromise(waitingConsoleFunction, 2);;
// }
// // const mappingFuntion = bufferPromise(waitingConsoleFunction, 2);

// setTimeout(() => {
//     // console.log(await Promise.all(
//         [0,1,2,3,4,5].map(mappingFuntion)
//     // ));
// }, 0);

// setTimeout(() => {
//     // console.log(await Promise.all(
//         [6,7,8,9,10,11,].map(mappingFuntion)
//     // ));
// }, 8000);