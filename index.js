// Your code here
function createEmployeeRecord(employee){
    
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(eRecordObj, dateStamp){
    let obj = {
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(-4)), 
        date: dateStamp.slice(0, 10)
    }
    eRecordObj.timeInEvents.push(obj)
   
    return eRecordObj
}

function createTimeOutEvent(eRecordObj, dateStamp){
    let obj = {
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(-4)), 
        date: dateStamp.slice(0, 10)
    }
    eRecordObj.timeOutEvents.push(obj)

    return eRecordObj   
}

function hoursWorkedOnDate(eRecordObj, date){
    let hours;
    
    for (let i=0; i<eRecordObj.timeInEvents.length; i++){
        if (eRecordObj.timeInEvents[i].date === date){
            if (eRecordObj.timeOutEvents[i].date === date){
                hours = eRecordObj.timeOutEvents[i].hour - eRecordObj.timeInEvents[i].hour
            }
        }
    }

    return hours/100
}

function wagesEarnedOnDate(eRecordObj, date){
    return (hoursWorkedOnDate(eRecordObj, date)) * eRecordObj.payPerHour
}

function allWagesFor(eRecordObj){
    let allPay = [];
    let allDates = [];

    for (let i = 0; i < eRecordObj.timeInEvents.length; i++){
        allDates.push(eRecordObj.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(eRecordObj, date))
    });

    return allPay.reduce(( previousValue, currentValue ) => previousValue + currentValue)
}

function calculatePayroll(arrOfERecordObj){
    let payroll = [];

    arrOfERecordObj.forEach(employee => {
        payroll.push(allWagesFor(employee)) 
    });

    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}

