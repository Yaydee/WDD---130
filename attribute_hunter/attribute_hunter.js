import {auctionMaster} from "./api_viewer.mjs";

const attribute_list = [
    "§bAttack Speed",
    "§bArachno",
    "§bArachno Resistance",
    "§bBlazing",
    "§bBlazing Fortune",
    "§bBlazing Resistance",
    "§bBreeze",
    "§bCombo",
    "§bDeadeye",
    "§bDominance",
    "§bDouble Hook",
    "§bElite",
    "§bEnder",
    "§bEnder Resistance",
    "§bExperience",
    "§bFishing Experience",
    "§bFishing Speed",
    "§bFisherman",
    "§bFortitude",
    "§bHunter",
    "§bInfection",
    "§bIgnition",
    "§bLifeline",
    "§bLife Recovery",
    "§bLife Regeneration",
    "§bMagic Find",
    "§bMana Pool",
    "§bMana Regeneration",
    "§bMana Steal",
    "§bMending",
    "§bMidas Touch",
    "§bSpeed",
    "§bTrophy Hunter",
    "§bUndead",
    "§bUndead Resistance",
    "§bVeteran"
];

function buildDropDown(selector, list) {
    if (selector == "#attribute2") {
        document.querySelector(selector).options.add(new Option("Any", ""))
    }
    list.forEach((item) => document.querySelector(selector).options.add(new Option(item.substring(2), item)))
};

async function clickHandler(event) {
    event.preventDefault();
    document.getElementById("output").innerHTML = "";
    let any = false;
    const attr1 = document.querySelector("#attribute1").value;
    const attr2 = document.querySelector("#attribute2").value;
    if (attr2 == "Any") {
        any = true;
    };
    const filteredArray = await auctionMaster(attr1, attr2, any);
    console.log(filteredArray);
}

buildDropDown("#attribute1", attribute_list);
buildDropDown("#attribute2", attribute_list);

document.querySelector("#submit").addEventListener("click", clickHandler);