const express = require('express')
const app = express()
const port = 3001

let responseJson = [];
app.get('/', async (req, res) => {
    let reachPoint = 0;
    let prevValueUser1 = 0;
    let prevValueUser2 = 0;
    let afterValueUser1 = 0;
    let afterValueUser2 = 0;
    do {
        afterValueUser1 = await afterValueOfUSer('user1', prevValueUser1);
        if (afterValueUser1 !== 100) {
            afterValueUser2 = await afterValueOfUSer('user2', prevValueUser2);
        }
        prevValueUser1 = afterValueUser1;
        afterValueUser1 > afterValueUser2 ?
            reachPoint = afterValueUser1 : reachPoint = afterValueUser2;
        prevValueUser2 = afterValueUser2;
        if (reachPoint === 100) {
            break;
        }
    } while (reachPoint <= 100);
    return res.send(responseJson);
})

async function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber
}
async function checkValueExistsInSnackPoints(value) {
    let snakePoints = [{
        prev: 62,
        next: 5
    }, {
        prev: 33,
        next: 6
    },
    {
        prev: 49,
        next: 9
    },
    {
        prev: 88,
        next: 16
    },
    {
        prev: 42,
        next: 20
    }, {
        prev: 56,
        next: 53
    },
    {
        prev: 98,
        next: 64
    },
    {
        prev: 93,
        next: 73
    },
    {
        prev: 95,
        next: 75
    }];
    var check_element = snakePoints.filter(el => (el.prev === value));
    return check_element;
}

async function checkValueExistsInLadderPoint(value) {
    let ladderPoints = [{
        prev: 2,
        next: 37
    }, {
        prev: 27,
        next: 46
    },
    {
        prev: 10,
        next: 32
    },
    {
        prev: 51,
        next: 68
    },
    {
        prev: 61,
        next: 79
    }, {
        prev: 65,
        next: 84
    },
    {
        prev: 71,
        next: 91
    },
    {
        prev: 81,
        next: 100
    }];
    var check_element = ladderPoints.filter(el => (el.prev === value));
    return check_element;
}

async function afterValueOfUSer(user, value) {
    let randomNumber = await generateRandomNumber();
    let afterValue = randomNumber + value;
    let snackPointsResult = await checkValueExistsInSnackPoints(afterValue);
    if (snackPointsResult.length > 0) {
        afterValue = snackPointsResult[0].next;
    } else {
        let ladderPointsResult = checkValueExistsInLadderPoint(afterValue);
        if (ladderPointsResult.length > 0) {
            afterValue = ladderPointsResult[0].next;
        }
    }
    let obj = {};
    if (afterValue <= 100) {
        obj = `${user} rolled a ${randomNumber} and moved from ${value} to ${afterValue}`;
        responseJson.push(obj);
        return afterValue
    } else {
        afterValue = value;
        return afterValue;
    }

}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})