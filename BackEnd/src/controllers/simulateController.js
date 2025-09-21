import employees from "../data/employee.json" with { type: "json" };


const rooms = {
    ServerRoom: { minLevel: 2, open: "09:00", close: "11:00", cooldown: 15 },
    Vault: { minLevel: 3, open: "09:00", close: "10:00", cooldown: 30 },
    "R&D Lab": { minLevel: 1, open: "08:00", close: "12:00", cooldown: 10 },
};



let access = false;
let time = false;
let cooldown = false;

let accessMessage = '';
let timeMessage = '';
let cooldownMessage = '';

function toMinutes(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
}

const checkAccessLevel = (employee) => {
    const roomConfig = rooms[employee.room];
    accessMessage = '';

    if (employee.access_level < roomConfig.minLevel) {
        accessMessage = `below access level ${roomConfig.minLevel}`;
        return false;
    }
    else {
        return true;
    }
}

const checkTime = (employee) => {

    const requestTime = toMinutes(employee.request_time);
    const { open, close } = rooms[employee.room];
    timeMessage = '';

    const openTime = toMinutes(open);
    const closeTime = toMinutes(close);

    if (requestTime < openTime) {
        timeMessage = ` it's before open time (${openTime})`;
        return false;
    }
    else if (requestTime > closeTime) {
        timeMessage = ` it's after close time (${closeTime})`;
        return false;
    }
    else {
        return true;
    }
}

const checkCoolDown = (employee, accessedBefore) => {
    const roomConfig = rooms[employee.room];
    cooldownMessage = '';

    for (let emp of accessedBefore) {
        if (emp.empId === employee.id && emp.room === employee.room) {
            let cooldownCheck =
                toMinutes(employee.request_time) - toMinutes(emp.request_time);

            if (cooldownCheck < roomConfig.cooldown) {
                cooldownMessage = `employee cool down mins are (${cooldownCheck} mins) required (${roomConfig.cooldown} mins)`;
                return false;
            }
            else {
                return true;
            }
        }
    }
    return true;
};



export const handleSimulate = (req, res) => {

    let accessedBefore = [];
    let results = [];

    


    employees.forEach((employee) => {
    let empLog = {
    empId: employee.id,
    room: employee.room,
    request_time: employee.request_time,
    status: "",
    message: ""
}
        console.log("-------------------");
        access = checkAccessLevel(employee);
        time = checkTime(employee);

        if (access && time) {
            cooldown = checkCoolDown(employee, accessedBefore);
            accessedBefore.push({ ...empLog });

            if (cooldown) {
                console.log(`Final Decision: Access Granted to ${employee.id} for ${employee.room} at ${employee.request_time}`);
                empLog.status = "Granted";
                empLog.message = "Access Granted";

            }
            else {
                console.log(`Final Decision: Access Denied to ${employee.id} for ${employee.room} at ${employee.request_time} due to cooldown ${cooldownMessage}`);
                empLog.status = "Denied";
                empLog.message = `Access Denied due to cooldown ${cooldownMessage}`;

            }
        }
        else if (!access) {
            console.log(`Final Decision: Access Denied to ${employee.id} for ${employee.room} at ${employee.request_time} due to access level ${accessMessage}`);
            empLog.status = "Denied";
            empLog.message = `Access Denied due to access level ${accessMessage}`;
        } else if (!time) {
            console.log(`Final Decision: Access Denied to ${employee.id} for ${employee.room} at ${employee.request_time} due to time restrictions ${timeMessage}`);
            empLog.status = "Denied";
            empLog.message = `Access Denied due to time restrictions ${timeMessage}`;
        }
        results.push(empLog);
    })
    accessedBefore = [];
    return res.json(results);


};
