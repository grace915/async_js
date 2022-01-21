'use strict';

// 1. producer
const promise = new Promise((resolve, reject) => {
    // heavy한 일을 한다
    // 네트워크에서 데이터 받기, 파일에서 큰 데이터 읽는 과정
    console.log('doing something...');
    setTimeout(() => {
        resolve('ellie'); // 성공적일 때 resolve 함수 사용
        reject(new Error('no network')); // 실패했을 때 reject 함수 사용. Error은 object

    }, 2000);
})
// executor 콜백함수는 resolve(기능을 정상적으로 전송해서 최종 데이터 전달 ), reject(문제생기면 호출되는 함수) 두가지 콜백 함수 가진다
// promise 만드는 순간 excutor 함수가 바로 실행된다. 
// 만약 네트워크 요청을 사용자가 요구했을 때만 해야하는 경우라면 이렇게 작성하면 안된다. 

// 2. consumers : then, cathch, finally
// 값이 정상적으로 수행된다면 then value 값을 받아온다.  value는 resolve에서 전달된 값
// then이 promise를 return하므로 .catch 가능 (chaining)
promise.then((value) => {
    console.log(value);
})
    .catch(error => { //error 핸들링
        console.log(error);
    }).finally(() => { // 성공 유무 상관없이 마지막에 호출
        console.log('finally')
    })

// 3. promise chaining 프로미스 연결하기
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);

});//1 -> 2-> 6-> 5
//then은 값, promise 전달 가능
// 2초 소요
// 비동기적인 것들을 묶어서 실행 가능
fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    })
    .then(num => console.log(num));

// 4. error handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('🐓'), 1000);
    });
// 암탉을 받아와서 계란을 만들고
const getEgg = hen =>
    new Promise((resolve, reject) => {
        // error 처리해보기
        // setTimeout(() => resolve(`${hen} =>🥚`), 1000);
        setTimeout(()=> reject(new Error(`error! ${hen} => 🥚`)), 1000);
    });
// 계란을 받아와서 요리를 만든다
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} =>🍳`), 1000);
    });
// 받아온것을 그대로 다른 함수에 호출하면 생략 가능하다
getHen()
    .then(hen => getEgg(hen))
    .then(egg => cook(egg))
    .then(meal => console.log(meal))
    .catch(console.log);

getHen() // 계란 못받아와도 빵을 대신 전달해줘서 실패하지 않는다. getEgg에서 발생하는 에러는 바로 다음에 catch해서 처리해줄 수 있다
    .then(getEgg)
    .catch(error => {
        return '🥖';
    })
    .then(cook)
    .then(console.log)
    .catch(console.log); //에러 잡기

    // 5. 