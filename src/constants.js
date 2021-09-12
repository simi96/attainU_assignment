export const monthsMapping = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': "Aug",
    "09": 'Sep',
    "10": 'Oct',
    "11": 'Nov',
    "12": "Dec"
}

export const  formatDateNumber = (str) => {
    switch (str) {
        case "01":
        case "21":
        case "31":
            return str + "st"

        case "02":
        case "22":
            return str + "nd"

        case "03":
        case "23":
            return str + "rd"

        default:
            return str + "th"
    
    }
}

export const  formatDateOfBirth = (d) => {
    let date = d.split('T')[0]
    let dateSplit = date.split('-')
    let newDate = ''
    newDate += formatDateNumber(dateSplit[2]) + ' ' + monthsMapping[dateSplit[1]] + ' ' + dateSplit[0]
    return newDate
}


