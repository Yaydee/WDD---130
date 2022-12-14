const baseUrl = "https://api.hypixel.net/skyblock/auctions";

const UUID = "84d205758bba4cee82ab5415e025bcda";

const player = `https://api.hypixel.net/skyblock/profile?profile=84d205758bba4cee82ab5415e025bcda`

const ApiKey = "8e8e2506-5c50-4f33-bf4e-b8c60d52b46a"

async function test (player) {
    const options = {headers:{"Api-Key":"8e8e2506-5c50-4f33-bf4e-b8c60d52b46a"}};
    const response = await fetch(player, options);
    console.log(await response.json());
}

test(player);

export async function auctionMaster(attribute1, attribute2, any) {
    
    // fetch auction information from the Hypixel API
    const data = await fetchAuctions();

    // define the array returned by the API
    const array = data.auctions;

    // filter the array through the attributes
    const filteredArray = filterAttributes(array, attribute1, attribute2, any);
    // format each item individually from here --------------------------------
    buildSectionReturn(filteredArray, attribute1, attribute2);
    // find information for "item_name:", "bin:", and either the "starting_bid" or "highest_bid_amount" values

    // build the <div> for each item

    

}

async function fetchAuctions() {
    const response = await fetch(baseUrl);
    if (response.ok) {
        const data = await response.json();
        // console.log(data);
        return data;
    }
}

// fetches the second attribute of an item
function fetchAttr2(item) {
    let text = item.item_lore;
    const position = text.lastIndexOf("§b"); // returns the position of the second attribute
    text = text.slice((position + 2), (position + 20)); // returns 20 characters after the postition of the second attribute
    const end = text.search("§");
    text = text.slice(end, (18 - end));
    return text;
    
}

// filters the array according to whether the user specified for a second attribute
function filterAttributes(array, attr1, attr2) {
    if (attr2) {
        return array.filter((item) => {
            return (((item.item_lore.includes(`${attr1} I`)) || (item.item_lore.includes(`${attr1} V`)) || (item.item_lore.includes(`${attr1} X`))) && ((item.item_lore.includes(`${attr2} I`)) || (item.item_lore.includes(`${attr2} V`)) || (item.item_lore.includes(`${attr2} X`))));
        });
    } else return array.filter((item) => {
        return ((item.item_lore.includes(`${attr1} I`)) || (item.item_lore.includes(`${attr1} V`)) || (item.item_lore.includes(`${attr1} X`)));
    });
}

// checks if an item is a BIN auction or not. Returns a boolean
function checkifAH(item) {
    return item.bin = `true`;
}

// checks highest_bid if it's an auction and starting_bid if it's a BIN. Returns an integer
function checkBid(item, BIN) {
    if (!BIN) {
        if (item.starting_bid < item.highest_bid_amount) {
            return item.highest_bid_amount;
        } else return item.starting_bid;
    } else return item.starting_bid;
}

// builds a <div> for an item
function buildItemReturn(item, attribute1, attribute2) {
    if (!attribute2) {
        attribute2 = fetchAttr2(item);
    };
    return `<div class="item"><p class="attribute1">${attribute1.substring(2)}</p><p class="attribute2">${attribute2}</p><p>BIN: ${checkifAH(item)}</p><p>Bid: ${checkBid(item)} coins</p></div>`
}

// builds a section made of items for each item_name
function buildSectionReturn(filteredArray, attribute1, attribute2) {
    // const divArray = filteredArray.map(buildItemReturn(item, attribute1, attribute2));
    let group = "";
    let section = "";
    filteredArray.forEach(item => {
        if (group != item.item_name) {
            // return the section last worked on
            if (section) {
                document.getElementById("output").append(section);
            }
            // build a new section of items
            section = document.createElement("section");
            section.classList.add("group");
            section.insertAdjacentHTML("afterbegin", `<h2>${item.item_name}</h2>`);
            section.insertAdjacentHTML("beforeend", buildItemReturn(item, attribute1, attribute2));
            group = item.item_name
        } else section.insertAdjacentHTML("beforeend", buildItemReturn(item, attribute1, attribute2));
    });
    // document.getElementById("#output").innerHTML = `<r>`
}
