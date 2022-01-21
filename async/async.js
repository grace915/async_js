// async & await
// promise 깔끔하게 사용
// 무조건 바꾸라는 것은 아니다!

//1. async
function fetchUser() {
    // 네트워크에서 백엔드 받아오는 코드가 있을 때 10초 걸린다면
    // 동기적 처리는 10초 후에 다음 코드들이 실행된다.
    //return 'ellie';

    //비동기적 처리
    return new Promise((resolve, reject) => {
        //return 'ellie'; // 이렇게 resolve, reject 안하면 pending 상태다
        resolve('ellie');
    })
}
async function fetchUser2() {
    return 'ellie'
}

const user = fetchUser();
const user2 = fetchUser2();
user.then(console.log);
user2.then(console.log);
console.log(user);

// 2. await - async 함수 안에서만 사용 가능하다
// delay는 정해진 시간이 지나면 resolve 호출하는 promise 전달
// getApple은 await은 딜레이가 끝날 때까지 기다려준다
// 바나나도 1초 있다가 리턴해준다
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getApple() {
    await delay(1000);
    // error 처리
    // throw 'error';
    return `🍎`;
}
async function getBanana() {
    await delay(1000);
    return `🍌`;
}
// ==
function getBanana() {
    return delay(1000)
        .then(() => '🍌');
}

// 사과와 바나나 모두 따오기
// 콜백 지옥이야!!!!
/*
function pickFruits(){
    return getApple()
    .then(apple => {
        return getBanana()
        .then(banana => `${apple} + ${banana}`);
    });
}
*/
async function pickFruits() {
    // error 처리는 try catch로 가능
    // 3. awit 병렬 처리
    const applePromise = getApple();
    const bananaPromise = getBanana();
    // 프로미스를 만들자마자 코드가 실행되어서 병렬적으로 실행 됨
    // 둘다 기다리고 실행 -> 1초만에 둘다 가능
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;

    // 이렇게 해도 더러워!!

}

pickFruits().then(console.log);

// 4. useful promise APIs
function pickAllFruits(){
    return Promise.all([getApple(), getBanana()]) //모든 promise 병렬적으로 다 받을 때까지 모아준다.
    .then(fruits => fruits.join(` + `));
}
pickAllFruits().then(console.log);

function pickOnlyOne(){
    // 둘중 먼저 값을 받는걸 선택
    return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
