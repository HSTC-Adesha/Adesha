$(document).ready(function () {
  'use strict';
  if (!localStorage.getItem('adesha-user-email') || !localStorage.getItem('adesha-user-username')) {
    window.location.replace("login.html");
  }
  $('.the-user-name').html(localStorage.getItem('adesha-user-username'));
  $('.the-user-email').html(localStorage.getItem('adesha-user-email'));
  var todayIs = moment(new Date()).format("DD/MM/YYYY");
  var tomorrowIs = moment(todayIs, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");

  var weekList = [];
  var nextWeekList = [];
  var previousWeekList = [];
  for (var i = 0; i < 7; i++) {
    weekList.push(moment(todayIs, "DD/MM/YYYY").add(i, 'days').format("DD/MM/YYYY"));
  }
  for (var i = 7; i < 14; i++) {
    nextWeekList.push(moment(todayIs, "DD/MM/YYYY").add(i, 'days').format("DD/MM/YYYY"));
  }
  for (var i = 0; i < 7; i++) {
    previousWeekList.push(moment(todayIs, "DD/MM/YYYY").subtract(i, 'days').format("DD/MM/YYYY"));
  }

  const socket = io('http://localhost:3000');
  socket.on('connect', function () {
    console.log('Connected');
    socket.on('dbcheck', function (data) {
      console.log('dbcheck', data);
      getStats();
    });
    // socket.emit('events', {
    //   test: 'test'
    // });
    // socket.emit('identity', 0, response =>
    //   console.log('Identity:', response)
    // );
  });
  socket.on('events', function (data) {
    console.log('event', data);
  });
  socket.on('dbcheck', function (data) {
    console.log('dbcheck', data);
    getStats();
  });
  socket.on('exception', function (data) {
    console.log('event', data);
  });
  socket.on('disconnect', function () {
    console.log('Disconnected');
  });
  var setlastmonthBalance = function (rec, emm) {
    console.log(rec, emm);
    var DEFAULT_DATASET_SIZE = 7,
      addedCount = 0,
      color = Chart.helpers.color;
    var chartColors = {
      red: 'rgb(255, 99, 132)',
      green: 'rgb(75, 192, 192)',

    };


    var barData = {
      labels: [moment(todayIs, "DD/MM/YYYY").subtract(1,"months").format('MMMM')],
      datasets: [{
        label: 'Cheque In',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        borderWidth: 1,
        data: [
          rec,

        ]
      }, {
        label: 'Cheque Out',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        borderWidth: 1,
        data: [
          emm
        ]
      }]

    };
    var ctx = document.getElementById("barChart").getContext("2d");
    var myNewChartB = new Chart(ctx, {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        maintainAspectRation: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        }
      }
    });



  }
  var setnextmonthBalance = function (rec, emm) {
    console.log(rec, emm);
    var DEFAULT_DATASET_SIZE = 7,
      addedCount = 0,
      color = Chart.helpers.color;
    var chartColors = {
      red: 'rgb(255, 99, 132)',
      green: 'rgb(75, 192, 192)',

    };


    var barData = {
      labels: [moment(todayIs, "DD/MM/YYYY").add(1,"months").format('MMMM')],
      datasets: [{
        label: 'Cheque In',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        borderWidth: 1,
        data: [
          rec,

        ]
      }, {
        label: 'Cheque Out',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        borderWidth: 1,
        data: [
          emm
        ]
      }]

    };
    var ctx = document.getElementById("barChartt").getContext("2d");
    var myNewChartB = new Chart(ctx, {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        maintainAspectRation: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        }
      }
    });




  }
  var setyearBalance = function (rec, emm) {
    console.log(rec, emm);
    console.log(rec, emm);
    var DEFAULT_DATASET_SIZE = 7,
      addedCount = 0,
      color = Chart.helpers.color;
    var chartColors = {
      red: 'rgb(255, 99, 132)',
      green: 'rgb(75, 192, 192)',

    };


    var barData = {
      labels: [moment(todayIs, "DD/MM/YYYY").format('YYYY')],
      datasets: [{
        label: 'Cheque In',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        borderWidth: 1,
        data: [
          rec,

        ]
      }, {
        label: 'Cheque Out',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        borderWidth: 1,
        data: [
          emm
        ]
      }]

    };
    var ctx = document.getElementById("barChartw").getContext("2d");
    var myNewChartB = new Chart(ctx, {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        maintainAspectRation: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        }
      }
    });




  }
  var setmonthBalance = function (rec, emm) {
    console.log(rec, emm);
    console.log(rec, emm);
    var DEFAULT_DATASET_SIZE = 7,
      addedCount = 0,
      color = Chart.helpers.color;
    var chartColors = {
      red: 'rgb(255, 99, 132)',
      green: 'rgb(75, 192, 192)',
    };
    var barData = {
      labels: [moment(todayIs, "DD/MM/YYYY").format('MMMM')],
      datasets: [{
        label: 'Cheque In',
        backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
        borderColor: chartColors.green,
        borderWidth: 1,
        data: [
          rec,

        ]
      }, {
        label: 'Cheque Out',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        borderWidth: 1,
        data: [
          emm
        ]
      }]

    };
    var ctx = document.getElementById("barChartm").getContext("2d");
    var myNewChartB = new Chart(ctx, {
      type: 'bar',
      data: barData,
      options: {
        responsive: true,
        maintainAspectRation: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        }
      }
    });




  }
  var setChart = function (rslt) {
    var labelsList = [];
    for (var i = 3; i > -1; i--) {
      labelsList.push(moment(todayIs, "DD/MM/YYYY").subtract(i, 'months').format('MMMM/YYYY'));
    }
    for (var i = 1; i < 4; i++) {
      labelsList.push(moment(todayIs, "DD/MM/YYYY").add(i, 'months').format('MMMM/YYYY'));
    }
    var recList = [0, 0, 0, 0, 0, 0, 0];
    var emisList = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < rslt.length; i++) {
      var cheq = rslt[i];
      var theDate = moment(cheq.dueDate, 'DD/MM/YYYY').format("MMMM/YYYY");
      for (var z = 0; z < labelsList.length; z++) {
        if (cheq.received == true) {
          if (theDate == labelsList[z]) {
            recList[z] = recList[z] + parseInt(cheq.amount);
          }
        } else {
          if (theDate == labelsList[z]) {
            emisList[z] = emisList[z] + parseInt(cheq.amount);

          }

        }
      }

    }

    var ctx = document.getElementById("myChart").getContext("2d");
    var data = {
      labels: labelsList,
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Cheques"
        },
        tooltips: {
          mode: 'index',
        },
        hover: {
          mode: 'index'
        }
      },
      datasets: [{
          label: "Received",
          borderColor: "rgb(0, 153, 51)",
          fill: false,
          data: recList
        },
        {
          label: "My cheques",
          borderColor: "#cc3300",
          fill: false, //<-- set this
          data: emisList
        }
      ]
    };

    var myNewChart = new Chart(ctx, {
      type: "line",
      data: data,
    });
  };
  var getStats = function (params) {
    $.ajax({
      url: "/cheque",
      type: 'GET',
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader("Accept", "application/json, text/javascript,  */*");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
      },
      complete: function complete(params) {},
      error: function error(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      },
      success: function success(result) {
        console.log(result);
        if (result.length) {
          var todayData = [];
          $('.cheques-total-number').html(result.length);
          var amm = 0;
          var received = 0;
          var emmitted = 0;
          var tomorrowRecAmmount = 0;
          var tomorrowRecNum = 0;
          var tomorrowAmmount = 0;
          var tomorrowNum = 0;
          var wRecAmmount = 0;
          var wRecNum = 0;
          var wAmmount = 0;
          var wNum = 0;
          var nwRecAmmount = 0;
          var nwRecNum = 0;
          var nwAmmount = 0;
          var nwNum = 0;
          var pwRecAmmount = 0;
          var pwRecNum = 0;
          var pwAmmount = 0;
          var pwNum = 0;
          var mRecAmmount = 0;
          var mRecNum = 0;
          var mAmmount = 0;
          var mNum = 0;

          var todayRecAmmount = 0;
          var todayRecNum = 0;
          var todayAmmount = 0;
          var todayNum = 0;
          var notRecNum = 0;
          var notRecAmmount = 0;

          var yea = 0;
          var yea2 = 0;
          var nm = 0;
          var nm2 = 0;
          var pm = 0;
          var pm2 = 0;

          var notNum = 0;
          var notAmmount = 0;
          var todayCheques = [];
          for (var i = 0; i < result.length; i++) {
            var cheq = result[i];
            var monthly = moment(cheq.dueDate, "DD/MM/YYYY").format("MM/YYYY");
            var nextmonthly = moment(cheq.dueDate, "DD/MM/YYYY").add(1,'months').format("MM/YYYY");
            var previousmonthlu = moment(cheq.dueDate, "DD/MM/YYYY").subtract(1,'months').format("MM/YYYY");
            var year = moment(cheq.dueDate, "DD/MM/YYYY").format("YYYY");
            if (cheq.received == true) {
              received += 1;
              if (moment(todayIs, "DD/MM/YYYY").format("DD/MM/YYYY") == cheq.dueDate) {
                todayRecNum += 1;
                todayRecAmmount += parseInt(cheq.amount);
                todayCheques.push(cheq)
              }
              if (moment(tomorrowIs, "DD/MM/YYYY").format("DD/MM/YYYY") == cheq.dueDate) {
                tomorrowRecNum += 1;
                tomorrowRecAmmount += parseInt(cheq.amount);

              }
              if (moment(todayIs, "DD/MM/YYYY").format("MM/YYYY") == monthly) {
                mRecNum += 1;
                mRecAmmount += parseInt(cheq.amount);

              }
              if (moment(todayIs, "DD/MM/YYYY").format("YYYY") == year) {
                yea += parseInt(cheq.amount);
              }
              if (moment(todayIs, "DD/MM/YYYY").format("MM/YYYY") == nextmonthly) {
                nm += parseInt(cheq.amount);
              }
              if (moment(todayIs, "DD/MM/YYYY").format("MM/YYYY") == previousmonthlu) {
                pm += parseInt(cheq.amount);
              }
              if (weekList.includes(cheq.dueDate)) {
                wRecNum += 1;
                wRecAmmount += parseInt(cheq.amount);

              }
              if (nextWeekList.includes(cheq.dueDate)) {
                nwRecNum += 1;
                nwRecAmmount += parseInt(cheq.amount);

              }
              if (previousWeekList.includes(cheq.dueDate)) {
                pwRecNum += 1;
                pwRecAmmount += parseInt(cheq.amount);

              }

              if (cheq.status != "done") {
                notRecNum += 1;
                notRecAmmount += parseInt(cheq.amount);
              }
            } else {
              emmitted += 1;
              if (moment(todayIs, "DD/MM/YYYY").format("DD/MM/YYYY") == cheq.dueDate) {
                todayNum += 1;
                todayAmmount += parseInt(cheq.amount);
                todayCheques.push(cheq)

              }
              if (moment(todayIs, "DD/MM/YYYY").format("YYYY") == year) {
                yea2 += parseInt(cheq.amount);
              }
              if (moment(todayIs, "DD/MM/YYYY").format("MM/YYYY") == nextmonthly) {
                nm2 += parseInt(cheq.amount);
              }
              if (moment(todayIs, "DD/MM/YYYY").format("MM/YYYY") == previousmonthlu) {
                pm2 += parseInt(cheq.amount);
              }
              if (weekList.includes(cheq.dueDate)) {
                wNum += 1;
                wAmmount += parseInt(cheq.amount);

              }
              if (nextWeekList.includes(cheq.dueDate)) {
                nwNum += 1;
                nwAmmount += parseInt(cheq.amount);

              }
              if (previousWeekList.includes(cheq.dueDate)) {
                pwNum += 1;
                pwAmmount += parseInt(cheq.amount);

              }
              if (moment(todayIs, "DD/MM/YYYY").format("MM/YYYY") == monthly) {
                mNum += 1;
                mAmmount += parseInt(cheq.amount);

              }
              if (moment(tomorrowIs, "DD/MM/YYYY").format("DD/MM/YYYY") == cheq.dueDate) {
                tomorrowNum += 1;
                tomorrowAmmount += parseInt(cheq.amount);

              }
              if (cheq.status != "done") {
                notNum += 1;
                notAmmount += parseInt(cheq.amount);
              }
            }
            amm = amm + parseInt(result[i].amount);
          }

          $('.today-due-received').html(todayRecNum);
          $('.today-due-ammount-received').html(todayRecAmmount);
          $('.today-due').html(todayNum);
          $('.today-due-ammount').html(todayAmmount);

          $('.tomorrow-due-received').html(tomorrowRecNum);
          $('.tomorrow-due-ammount-received').html(tomorrowRecAmmount);
          $('.tomorrow-due').html(tomorrowNum);
          $('.tomorrow-due-ammount').html(tomorrowAmmount);

          $('.w-due-received').html(wRecNum);
          $('.w-due-ammount-received').html(wRecAmmount);
          $('.w-due').html(wNum);
          $('.w-due-ammount').html(wAmmount);

          $('.m-due-received').html(mRecNum);
          $('.m-due-ammount-received').html(mRecAmmount);
          $('.m-due').html(mNum);
          $('.m-due-ammount').html(mAmmount);

          $('.nottreated-number').html(notNum);
          $('.nottreated-ammount').html(notAmmount);
          $('.received-nottreated-number').html(notRecNum);
          $('.received-nottreated-ammount').html(notRecAmmount);

          $('.cheques-total-ammount').html(amm + "$");
          $('.cheques-total-received').html(received);
          $('.cheques-total-emmitted').html(emmitted);



          setChart(result);
          setWeeklyChart(result);
          setWeeklyChartP(result);
          setWeeklyChartN(result);
          setmonthBalance(mRecAmmount, mAmmount);
          setnextmonthBalance(nm,nm2);
          setlastmonthBalance(pm,pm2);
          setyearBalance(yea,yea2);
          setChequeTables(result);
          setChequeTablesToday(todayCheques);

        } else {

        }
      }
    });
  };
  var setWeeklyChartP = function (rslt) {
    var labelsList = [];
    for (var i = 0; i < 7; i++) {
      labelsList.push(moment(todayIs, "DD/MM/YYYY").subtract(i, 'days').format('DD/MM/YYYY'));
    }
    var recList = [0, 0, 0, 0, 0, 0, 0];
    var emisList = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < rslt.length; i++) {
      var cheq = rslt[i];
      var theDate = moment(cheq.dueDate, 'DD/MM/YYYY').format("DD/MM/YYYY");
      for (var z = 0; z < labelsList.length; z++) {
        if (cheq.received == true) {
          if (theDate == labelsList[z]) {
            recList[z] = recList[z] + parseInt(cheq.amount);
          }
        } else {
          if (theDate == labelsList[z]) {
            emisList[z] = emisList[z] + parseInt(cheq.amount);

          }

        }
      }

    }

    var ctx = document.getElementById("myChartWeeklyP").getContext("2d");
    var data = {
      labels: labelsList,
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Cheques"
        },
        tooltips: {
          mode: 'index',
        },
        hover: {
          mode: 'index'
        }
      },
      datasets: [{
          label: "Cheque In",
          borderColor: "rgb(0, 153, 51)",
          fill: false,
          data: recList
        },
        {
          label: "Cheque Out",
          borderColor: "#cc3300",
          fill: false, //<-- set this
          data: emisList
        }
      ]
    };

    var myNewChart = new Chart(ctx, {
      type: "line",
      data: data,
    });
  };
  var setWeeklyChartN = function (rslt) {
    var labelsList = [];
    for (var i = 7; i < 14; i++) {
      labelsList.push(moment(todayIs, "DD/MM/YYYY").add(i, 'days').format('DD/MM/YYYY'));
    }
    var recList = [0, 0, 0, 0, 0, 0, 0];
    var emisList = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < rslt.length; i++) {
      var cheq = rslt[i];
      var theDate = moment(cheq.dueDate, 'DD/MM/YYYY').format("DD/MM/YYYY");
      for (var z = 0; z < labelsList.length; z++) {
        if (cheq.received == true) {
          if (theDate == labelsList[z]) {
            recList[z] = recList[z] + parseInt(cheq.amount);
          }
        } else {
          if (theDate == labelsList[z]) {
            emisList[z] = emisList[z] + parseInt(cheq.amount);

          }

        }
      }

    }

    var ctx = document.getElementById("myChartWeeklyN").getContext("2d");
    var data = {
      labels: labelsList,
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Cheques"
        },
        tooltips: {
          mode: 'index',
        },
        hover: {
          mode: 'index'
        }
      },
      datasets: [{
          label: "Cheque In",
          borderColor: "rgb(0, 153, 51)",
          fill: false,
          data: recList
        },
        {
          label: "Cheque Out",
          borderColor: "#cc3300",
          fill: false, //<-- set this
          data: emisList
        }
      ]
    };

    var myNewChart = new Chart(ctx, {
      type: "line",
      data: data,
    });
  };
  var setWeeklyChart = function (rslt) {
    var labelsList = [];
    for (var i = 0; i < 7; i++) {
      labelsList.push(moment(todayIs, "DD/MM/YYYY").add(i, 'days').format('DD/MM/YYYY'));
    }
    var recList = [0, 0, 0, 0, 0, 0, 0];
    var emisList = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < rslt.length; i++) {
      var cheq = rslt[i];
      var theDate = moment(cheq.dueDate, 'DD/MM/YYYY').format("DD/MM/YYYY");
      for (var z = 0; z < labelsList.length; z++) {
        if (cheq.received == true) {
          if (theDate == labelsList[z]) {
            recList[z] = recList[z] + parseInt(cheq.amount);
          }
        } else {
          if (theDate == labelsList[z]) {
            emisList[z] = emisList[z] + parseInt(cheq.amount);

          }

        }
      }

    }

    var ctx = document.getElementById("myChartWeekly").getContext("2d");
    var data = {
      labels: labelsList,
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Cheques"
        },
        tooltips: {
          mode: 'index',
        },
        hover: {
          mode: 'index'
        }
      },
      datasets: [{
          label: "Cheque In",
          borderColor: "rgb(0, 153, 51)",
          fill: false,
          data: recList
        },
        {
          label: "Cheque Out",
          borderColor: "#cc3300",
          fill: false, //<-- set this
          data: emisList
        }
      ]
    };

    var myNewChart = new Chart(ctx, {
      type: "line",
      data: data,
    });
  };
  var setChequeTables = function (data) {
    var tab = $('#tableIn').DataTable();
    tab.destroy();
    var tabO = $('#tableOut').DataTable();
    tabO.destroy();
    
    var theDataIn = [];
    var theDataOut = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i].received == true) {
        var obj = [data[i].number, data[i].company.name, data[i].bank.name, data[i].dueDate, data[i].status, data[i].amount]
        theDataIn.push(obj);

      } else {
        var obj = [data[i].number, data[i].company.name, data[i].bank.name, data[i].dueDate, data[i].status, data[i].amount]
        theDataOut.push(obj);
 
      }
      data[i].companyname = data[i].company.name;
      data[i].companyid = data[i].company._id;
    }
    setCompanyTables(groupBy(data, 'companyname'))
    var table = $('#tableIn').DataTable({
      data: theDataIn
    })
    var tableO = $('#tableOut').DataTable({
      data: theDataOut
    })
  }
  var setChequeTablesToday = function (data) {
    var tab = $('#tableInt').DataTable();
    tab.destroy();
    var tabO = $('#tableOutt').DataTable();
    tabO.destroy();
    
    var theDataIn = [];
    var theDataOut = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i].received == true) {
        var obj = [data[i].number, data[i].company.name, data[i].bank.name, data[i].dueDate, data[i].status, data[i].amount]
        theDataIn.push(obj);

      } else {
        var obj = [data[i].number, data[i].company.name, data[i].bank.name, data[i].dueDate, data[i].status, data[i].amount]
        theDataOut.push(obj);
 
      }
      data[i].companyname = data[i].company.name;
      data[i].companyid = data[i].company._id;
    }
    var table = $('#tableInt').DataTable({
      data: theDataIn
    })
    var tableO = $('#tableOutt').DataTable({
      data: theDataOut
    })
  }
  var setCompanyTables = function (data) {
    var tab = $('#companyAmmount').DataTable();
    tab.destroy();
    var tabr = $('#companyStatus').DataTable();
    tabr.destroy();
    var tabe = $('#companyStatuse').DataTable();
    tabe.destroy();
    var theData = [];
    var theDatar = [];
    var theDatae = [];

    
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
      var ammountR = 0;
      var ar = 0;
      var ae = 0;
      var ammountE = 0;
      var todo = 0;
      var done = 0;
      var other = 0;
      var todoe = 0;
      var donee = 0;
      var othere = 0;
      var boddy = data[keys[i]];

      for (var z = 0; z < boddy.length; z++) {
        if (boddy[z].received) {
          ammountR += parseInt(boddy[z].amount);
          ar +=1;
          if (boddy[z].status == 'done') {
            done += 1;
          } else {
            if (boddy[z].status == 'todo') {
              todo += 1;
            } else {
              other += 1;
            }
          }
        } else {
          ammountE += parseInt(boddy[z].amount);
          ae +=1;
          if (boddy[z].status == 'done') {
            donee += 1;
          } else {
            if (boddy[z].status == 'todo') {
              todoe += 1;
            } else {
              othere += 1;
            }
          }
        }
       
      }
      var obj = [keys[i],  data[keys[i]].length,ar, ammountR,ae, ammountE];
      var obj2 = [keys[i], ar,done, todo, other];
      var obj3 = [keys[i], ae,donee, todoe, othere];
      theData.push(obj);
      theDatar.push(obj2);
      theDatae.push(obj3);
    }
    var table = $('#companyAmmount').DataTable({
      data: theData
    })
    var tabler = $('#companyStatus').DataTable({
      data: theDatar
    })
    var tablee = $('#companyStatuse').DataTable({
      data: theDatae
    })
  }

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }
  getStats();
  $('.todaydate').html(todayIs);
  $('#tomorrowdate').html(tomorrowIs);
  $('#monthdate').html(moment(tomorrowIs, "DD/MM/YYYY").format("MMMM-YYYY"));
});