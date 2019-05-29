/**
 * reduce的使用方式
 * date: 2019-05-25
 * 来源：https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/
 */

// 1. 将数组转为对象
const peopleArr = [
    {
        username: "glestrade",
        displayname: "Inspector Lestrade",
        email: "glestrade@met.police.uk",
        authHash: "bdbf9920f42242defd9a7f76451f4f1d",
        lastSeen: "2019-05-13T11:07:22+00:00"
    },
    {
        username: "mholmes",
        displayname: "Mycroft Holmes",
        email: "mholmes@gov.uk",
        authHash: "b4d04ad5c4c6483cfea030ff4e7c70bc",
        lastSeen: "2019-05-10T11:21:36+00:00"
    },
    {
        username: "iadler",
        displayname: "Irene Adler",
        email: null,
        authHash: "319d55944f13760af0a07bf24bd1de28",
        lastSeen: "2019-05-17T11:12:12+00:00"
    }
];

function keyByUsernameReducer(acc, person) {
    return { ...acc, [person.username]: person };
}

const personObj = peopleArr.reduce(keyByUsernameReducer, {});
// console.log(personObj);

// 2. 数组拆分为更大的数组
const fileLines = [
    "Inspector Algar,Inspector Bardle,Mr. Barker,Inspector Barton",
    "Inspector Baynes,Inspector Bradstreet,Inspector Sam Brown",
    "Monsieur Dubugue,Birdy Edwards,Inspector Forbes,Inspector Forrester",
    "Inspector Gregory,Inspector Tobias Gregson,Inspector Hill",
    "Inspector Stanley Hopkins,Inspector Athelney Jones"
];

function splitLineReducer(acc, line) {
    return acc.concat(line.split(/,/g));
}
const investigators = fileLines.reduce(splitLineReducer, []);
console.log(investigators);
