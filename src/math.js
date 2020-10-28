// sum 이라는 함수는 math module 안에서만 유효한것이 아니라
// 어플리케이션이 돌아가는 어느곳에서나 유효하다.(전역스코프)
// js는 함수타입에 다른 값을 할당 할수 있다
// 만약 다른 module에서 sum = 1 을 할당한다면 sum의 값은 1이 된다.
// 이렇게 전역스스코프가 오염되게 되면 어플리케이션이 예측하기 어려워 지고 런타임 에러가 생긴다.

//   function sum(a, b) {
//     return a + b;
//   }

// ===================================================== //

// IIFE 표현 ( 즉시 실행 함수 표현 )
// 함수를 정의하자마자 실행하므로 다른곳에서 접근 할 수 없다.

// const math = math || {};
// (function() {
//   function sum(a, b) {
//     return a + b;
//   }
//   math.sum = sum;
// })();

// ===================================================== //

// ES2015 표준 모듈 시스템

// export function sum(a, b) {
//   return a + b;
// }