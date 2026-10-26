//1

const regExp = /^\d+$/;

const containsOnlyDigits = (str) => {
    return regExp.test(str);
};

console.log(containsOnlyDigits("12345")); // true
console.log(containsOnlyDigits("12a45")); // false
console.log(containsOnlyDigits("123 45")); // false
console.log(containsOnlyDigits(""));       // false

//2

setInterval(() => {
    console.log("Прошла секунда");
}, 1000);

//3
const count = () => {
    let i = 1;

    const interval = setInterval(() => {
        console.log(i);

        if (i === 10) {
            clearInterval(interval);
        }

        i++;
    }, 1000);
};

count();

//4
const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let seconds = 10;
let interval = null;

startBtn.addEventListener("click", () => {
    if (interval !== null || seconds === 0) {
        return;
    }

    interval = setInterval(() => {
        seconds--;
        timer.textContent = seconds;

        if (seconds === 0) {
            clearInterval(interval);
            interval = null;
        }
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    seconds = 10;
    timer.textContent = seconds;
});

//5
const block = document.querySelector("#block");

block.addEventListener("click", () => {
    block.classList.toggle("active");
});

//6
const xhr = new XMLHttpRequest();

xhr.open("GET", "./test.json");

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        console.log(data);
        console.log(data.key1);
        console.log(data.key2);
        console.log(data.key3);
    } else {
        console.log("Ошибка загрузки:", xhr.status);
    }
};

xhr.onerror = function () {
    console.log("Ошибка сети");
};

xhr.send();
//7
const loginInput = document.querySelector("#loginInput");
const checkBtn = document.querySelector("#checkBtn");
const userCard = document.querySelector("#userCard");
const message = document.querySelector("#message");

checkBtn.addEventListener("click", async () => {
    userCard.innerHTML = "";
    message.textContent = "";

    const login = loginInput.value.trim();

    if (!login) {
        message.textContent = "Введите логин!";
        return;
    }

    try {
        const response = await fetch("./users.json");

        if (!response.ok) {
            throw new Error("Не удалось загрузить пользователей");
        }

        const users = await response.json();

        const user = users.find(
            item => item.login === login
        );

        if (user) {
            userCard.innerHTML = `
                <div class="user-card">
                    <h2>${user.login}</h2>
                    <p>Роль: ${user.role}</p>
                    <p>Email: ${user.email}</p>
                </div>
            `;
        } else {
            message.textContent = "Пользователь не найден!";
        }
    } catch (error) {
        message.textContent =
            "Ошибка запроса. Не удалось загрузить данные.";
        console.error(error);
    }
});
//8
function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Alex" });
        }, 1000);
    });
}

function getPosts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Пост 1", "Пост 2"]);
        }, 2000);
    });
}

function getComments() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Комментарий 1", "Комментарий 2"]);
        }, 3000);
    });
}

Promise.all([
    getUser(),
    getPosts(),
    getComments()
])
    .then(([user, posts, comments]) => {
        console.log("Пользователь:", user);
        console.log("Посты:", posts);
        console.log("Комментарии:", comments);
    })
    .catch((error) => {
        console.log("Ошибка:", error);
    });
    reject(new Error("Не удалось загрузить комментарии"));

//9
async function getUserData(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const user = await response.json();

        console.log("Данные пользователя:", user);

        return user;
    } catch (error) {
        console.log("Ошибка запроса:", error.message);
    } finally {
        console.log("Запрос завершён");
    }
}

getUserData(1);
//10
async function createPhoto() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/photos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    albumId: 1,
                    title: "Моя фотография",
                    url: "https://example.com/photo.jpg",
                    thumbnailUrl: "https://example.com/thumbnail.jpg"
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Успешный ответ сервера:", data);
    } catch (error) {
        console.log("Ошибка запроса:", error.message);
    }
}

createPhoto();