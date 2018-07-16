var arr = [{
        "amount": 8.00,
        "inviteTime": "2018-06-22 15:56:45",
        "rebateName": "实时返利"
    },
    {
        "amount": 42.00,
        "rebateName": "月度返利",
        "inviteTime": "2018-06-22 15:56:45"
    },
    {
        "amount": 8.00,
        "inviteTime": "2018-05-22 15:56:45",
        "rebateName": "实时返利"
    },
    {
        "amount": 42.00,
        "rebateName": "月度返利",
        "inviteTime": "2018-05-22 15:56:45"
    },
    {
        "amount": 8.00,
        "inviteTime": "2018-03-22 15:56:45",
        "rebateName": "实时返利"
    },
    {
        "amount": 42.00,
        "rebateName": "月度返利",
        "inviteTime": "2018-03-22 15:56:45"
    }
]

var arr2 = {
    '2018-02': [{
        "amount": 42.00,
        "rebateName": "2月份",
        "inviteTime": "2018-02"
    }],
    '2018-06': [{
        "amount": 42.00,
        "rebateName": "6月份",
        "inviteTime": "2018-06"
    }],
}

newFunction();

function newFunction() {
    var obj = {};
    arr.forEach(i => {
        if (!obj[i.inviteTime.substring(0, 7)]) {
            obj[i.inviteTime.substring(0, 7)] = [i.inviteTime.substring(0, 7)];
        }
    });
    arr.forEach(i => {
        if (i.inviteTime.substring(0, 7) == obj[i.inviteTime.substring(0, 7)][0]) {
            obj[i.inviteTime.substring(0, 7)].push(i);
        }
    });
    for (i in obj) {
        obj[i].shift();
    }
}
