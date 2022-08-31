// Your code here

function createEmployeeRecord(employeeArray) {
    let obj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}


const createEmployeeRecords = (employeesArrayOfArrays) => {
    
    let objectsArray = []
    for (const array of employeesArrayOfArrays) {
        let obj = createEmployeeRecord(array)          
        objectsArray.push(obj)   
    }
    return objectsArray
}


const createTimeInEvent = (employeeObj, timeIn) => {
    let [theDate, hoursIn] = timeIn.split(' ')

    employeeObj.timeInEvents = [{
        type: "TimeIn",
        hour: Number(hoursIn),
        date: theDate
    }]
    return employeeObj
}


const createTimeOutEvent = (employeeObj, timeOut) => {
    let [theDate, hoursOut] = timeOut.split(' ')
    employeeObj.timeOutEvents = [{
        type: "TimeOut",
        hour: Number(hoursOut),
        date: theDate
    }]
    return employeeObj
}

const hoursWorkedOnDate = (employeeObj, onDate)  => {
    if(employeeObj.timeInEvents[0].date === onDate && employeeObj.timeOutEvents[0].date === onDate ) {
        return (employeeObj.timeOutEvents[0].hour - employeeObj.timeInEvents[0].hour)/100
    }    
}

const wagesEarnedOnDate = (employeeObj, date) => {
    let payRatePerHour = 27
    return Number(hoursWorkedOnDate(employeeObj, date)*payRatePerHour)
}

const allWagesFor = employeeObj => {
    let theDate = employeeObj.timeInEvents[0].date,
    daysWorkedPerWeek = employeeObj.timeInEvents.length,
    totalWeeksWorked= 7

    return wagesEarnedOnDate(employeeObj, theDate)*daysWorkedPerWeek*totalWeeksWorked
}

const calculatePayroll = arrayOfEmployeesObjects => {
    let allEmployees = arrayOfEmployeesObjects.length,
    employeeObj = arrayOfEmployeesObjects[0],

    theDate = employeeObj.timeInEvents[0].date

    return (wagesEarnedOnDate(employeeObj, theDate)*allWagesFor(employeeObj))/allEmployees

}
