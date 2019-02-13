const moment = require('moment');

moment.locale('tr');

console.log(moment.locale());

// burada 1970 ten bir kaç saniye sonrası ama alıdğımız değer bulunduğumuz konumdaki saat dilimine göre geliyor..
var date =moment(1234);

//date = date.format('DD MMMM YYYY -- HH:mm:ss zz');
date = date.format("LLLL");

console.log(date);

// valueOf milisaniye cinsinden o anı veriyor...
var date2 = moment().valueOf();




//momentjs.com is the source...