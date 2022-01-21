
// 5. call back hell example -> promise

class UserStorage {
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async loginUser(id, password) {
        await this.delay(2000);
        if (
            (id === 'ellie' && password === 'dream') ||
            (id === 'coder' && password === 'academy')
        ) {
            return id
        } else {
            return new Error('not found');
        }
    }
    async getRoles(user) {
        await this.delay(1000);

        if (user === 'ellie') {
            return { name: 'ellie', role: 'admin' };
        } else {
            return new Error('no access');
        }
    }

    async getUserData(id, pw) {
        const name = await this.loginUser(id, pw);
        const user = await this.getRoles(name);
        return `Hello ${user.name}, you have a ${user.role} role`;
    }

}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage
    .getUserData(id, password)
    .then((ment) => alert(ment))
    .catch(console.log);

