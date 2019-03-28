//获取当前时间，格式YYYY-MM-DD

let getNowFormatDate = () => {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let currentdate = year + seperator1 + month + seperator1 + strDate;

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let fullTime = year + seperator1 + month + seperator1 + strDate;
    return { currentdate, fullTime };
};

module.exports = {
    getNowFormatDate
};
