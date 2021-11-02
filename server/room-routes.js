/**
 * Front for BTH Salar server "index.js"
 * Containing all routes.
 */
"use strict";

// Main class for search algorithms.
// import from "./RoomFunctions.js";
const RoomFunctions = require("./RoomFunctions.js");
const roomSearch = new RoomFunctions();

// import router from "./router.js";
const Router = require("./router.js");
const router = new Router();


// Import the http server as base
const http = require("http");
const url = require("url");
// console.log(url)
const fs = require("fs");

// Store parsed JSON.
const parsedRooms = openFile()


/**
* Open file to search. Throw error if failed.
*/
function openFile() {
    try {
        const data = fs.readFileSync("../salar.json", 'utf8');
        const parsedData = JSON.parse(data)
        return parsedData;
    } catch(e) {
        console.log('Error: something went wrong...');
    }
}

/**
 * Wrapper function for sending a JSON response
 *
 * @param  Object        res     The response
 * @param  Object/String content What should be written to the response
 * @param  Integer       code    HTTP status code
 */
function sendJSONResponse(res, content, code = 200) {
    res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
    res.write(JSON.stringify(content, null, "    "));
    res.end();
}

/**
 * Display available APIs.
 *
 * @param Object req The request
 * @param Object res The response
 */

router.get("/", (req, res) => {
    var apiList = roomSearch.viewApi();

    sendJSONResponse(res, {
        "/": apiList[0],
        "/room/list": apiList[1],
        "/room/view/id/:number": apiList[2],
        "/room/view/house/:house": apiList[3],
        "/room/search/:search": apiList[4],
        "/room/searchp/:search": apiList[5]
    });
});


/**
 * List all rooms unfiltered.
 *
 * @param Object req The request
 * @param Object res The response
 */

router.get("/room/list", (req, res) => {
    sendJSONResponse(res, {
        "Alla salar": roomSearch.allRooms(parsedRooms)
    });
});


/**
 * Display room with specified id.
 *
 * @param Object req The request
 * @param Object res The response
 */

router.get("/room/view/id/:number", (req, res) => {
    const number = req.params.number;
    const key = "Sal nummer " + number.toUpperCase();
    var message = "";
    var result;

        try {
            result = roomSearch.getRoomById(parsedRooms, number);
        } catch (e) {
            result = e.message;
            key = "Failed"
        }

    sendJSONResponse(res, {
        [key]: result,
    });
});


/**
 * List all rooms within a specified building.
 *
 * @param Object req The request
 * @param Object res The response
 */

router.get("/room/view/house/:house", (req, res) => {
    const house = decodeURI(req.params.house);
    const houseInfo = house.toUpperCase().replace("%20", " ");
    const key = "Salar i " + houseInfo
    var message = "";
    var result;

    try {
        result = roomSearch.getRoomByBuilding(parsedRooms, house);

    } catch (e) {
        result = e.message;
        key = "Failed";
    }

    sendJSONResponse(res, {
        [key]: result,
    });
});


/**
 * List all rooms matching search string.
 *
 * @param Object req The request
 * @param Object res The response
 */

router.get("/room/search/:search", (req, res) => {
    const search = decodeURI(req.params.search);
    const searchInfo = search.replace("%20", " ");;
    const key = "Sökfras " + searchInfo;
    let message = "";
    let result;

    try {
        result = roomSearch.getRoomBySearch(parsedRooms, search);
    } catch (e) {
        result = e.message;
        key = "Failed";
    }

    sendJSONResponse(res, {
        [key]: result
    });
});


router.get("/room/searchp/:search", (req, res) => {
    const searchPrio = decodeURI(req.params.search);
    const searchInfo = searchPrio.replace("%20", " ");;
    const key = "Sökfras " + searchInfo;
    var message = "";
    var result;

    try {
        result = roomSearch.getRoomByPrio(parsedRooms, searchPrio);
    } catch (e) {
        result = e.message;
        key = "Failed";
    }

    sendJSONResponse(res, {
        [key]: result
    });
});
/**
 * Create and export server.
 */

const server = http.createServer((req, res) => {
    var ipAddress,
        host,
        route;

    // Log incoming requests.
    ipAddress = req.connection.remoteAddress;

    // Check which route is requested.

    route = url.parse(req.url).pathname;
    console.log("Incoming route: " + route + " from ip " + ipAddress);

    // Let the router take care of all requests.
    router.route(req, res);
});


// export default server;
module.exports = server;
