// onmessage = function(e) {
//     // console.log(e)
//     self.postMessage(e.data);
//     // console.log('Worker: Message received from main script');
//     // const result = e.data[0] * e.data[1];
//     // if (isNaN(result)) {
//     //   postMessage('Please write two numbers');
//     // } else {
//     //   const workerResult = 'Result: ' + result;
//     //   console.log('Worker: Posting message back to main script');
//     //   postMessage(workerResult);
//     // }
// }
// class webworkerTest {
//     static start(){
//         setTimeout(function(){
//             console.log("test");
//             webworkerTest.start();
//         }, 1000)
//     }
// }
// console.log("loaded")