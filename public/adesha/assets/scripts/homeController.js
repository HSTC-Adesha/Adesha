$(document).ready(function () {
  'use strict';
  if (!localStorage.getItem('adesha-user-email') || !localStorage.getItem('adesha-user-username')) {
    window.location.replace("login.html");
  }
  $('.the-user-name').html(localStorage.getItem('adesha-user-username'));
  $('.the-user-email').html(localStorage.getItem('adesha-user-email'));

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
  var setTodayBalance = function (rec, emm) {
    console.log(rec, emm);
    window.chartColors = {
      red: 'rgb(255, 99, 132)',
      green: 'rgb(75, 192, 192)',
    };

    Chart.defaults.global.tooltips.custom = function (tooltip) {
      // Tooltip Element
      var tooltipEl = document.getElementById('chartjs-tooltip');

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set Text
      if (tooltip.body) {
        var total = 0;

        // get the value of the datapoint
        var value = this._data.datasets[tooltip.dataPoints[0].datasetIndex].data[tooltip.dataPoints[0].index]

        // calculate value of all datapoints
        this._data.datasets[tooltip.dataPoints[0].datasetIndex].data.forEach(function (e) {
          total += e;
        });

        // calculate percentage and set tooltip value
        tooltipEl.innerHTML = '<h3>' + Math.round((value / total * 100)) + '%</h3>';
      }

      // calculate position of tooltip
      var centerX = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2;
      var centerY = ((this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2);

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.left = centerX + 'px';
      tooltipEl.style.top = centerY + 'px';
      tooltipEl.style.fontFamily = tooltip._fontFamily;
      tooltipEl.style.fontSize = tooltip.fontSize;
      tooltipEl.style.fontStyle = tooltip._fontStyle;
      tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
    };

    var config = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [rec, emm],
          backgroundColor: [
            window.chartColors.green,
            window.chartColors.red,

          ],
        }],
        labels: [
          "Received",
          "Emmitted",
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          labels: {
            padding: 20
          },
        },
        tooltips: {
          enabled: false,
        }
      }
    };

    window.onload = function () {
      var ctx = document.getElementById("chart-area").getContext("2d");
      window.myPie = new Chart(ctx, config);
    };
  }
  var setChart = function (rslt) {
    var labelsList = [];
    for (var i = 3; i > -1; i--) {
      labelsList.push(moment(new Date()).subtract(i, 'months').format('MMMM/YYYY'));
    }
    for (var i = 1; i < 4; i++) {
      labelsList.push(moment(new Date()).add(i, 'months').format('MMMM/YYYY'));
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
          var todayRecAmmount = 0;
          var todayRecNum = 0;
          var todayAmmount = 0;
          var todayNum = 0;
          var notRecNum = 0;
          var notRecAmmount = 0;
          var notNum = 0;
          var notAmmount = 0;
          for (var i = 0; i < result.length; i++) {
            var cheq = result[i];
            cheq.day = moment(cheq.dueDate).format("DD");
            cheq.month = moment(cheq.dueDate).format("MM");
            cheq.year = moment(cheq.dueDate).format("YYYY");
            if (cheq.received == true) {
              received += 1;
              if (moment(new Date()).format("DD/MM/YYYY") == cheq.dueDate) {
                todayRecNum += 1;
                todayRecAmmount += parseInt(cheq.amount);

              }
              if (cheq.status != "done") {
                notRecNum += 1;
                notRecAmmount += parseInt(cheq.amount);
              }
            } else {
              emmitted += 1;
              if (moment(new Date()).format("DD/MM/YYYY") == cheq.dueDate) {
                todayNum += 1;
                todayAmmount += parseInt(cheq.amount);

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
          $('.received-nottreated-number').html(notRecNum);
          $('.received-nottreated-ammount').html(notRecAmmount);




          $('.today-due').html(todayNum);
          $('.today-due-ammount').html(todayAmmount);
          $('.nottreated-number').html(notNum);
          $('.nottreated-ammount').html(notAmmount);


          $('.cheques-total-ammount').html(amm + "$");
          $('.cheques-total-received').html(received);
          $('.cheques-total-emmitted').html(emmitted);

          setChart(result);
          setWeeklyChart(result);
          setTodayBalance(todayRecAmmount, todayAmmount);
          setChequeTables(result);

        } else {

        }
      }
    });
  };
  var setWeeklyChart = function (rslt) {
    var labelsList = [];
    for (var i = 0; i < 7; i++) {
      labelsList.push(moment(new Date()).add(i, 'days').format('DD/MM/YYYY'));
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
  var setChequeTables = function (data) {
    var theData = [];

    for (var i = 0; i < data.length; i++) {
      var obj = [data[i].number, data[i].company.name, data[i].bank.name, data[i].dueDate, data[i].status, data[i].amount]
      theData.push(obj);
      data[i].companyname = data[i].company.name;
      data[i].companyid = data[i].company._id;
    }
    setCompanyTables(groupBy(data, 'companyname'))
    var table = $('#example').DataTable({
      data: theData
    })
  }
  var setCompanyTables = function (data) {
    var theData = [];
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
      var ammountR = 0;
      var ammountE = 0;
      var todo = 0;
      var done = 0;
      var other = 0;
      var boddy = data[keys[i]];

      for (var z = 0; z < boddy.length; z++) {
        if (boddy[z].received) {
          ammountR += parseInt(boddy[z].amount);
        }else{
          ammountE += parseInt(boddy[z].amount);
        }
        if(boddy[z].status=='done')
        {
          done += 1;
        }else{
          if(boddy[z].status=='todo')
          {
            todo += 1;
          }else{
            other += 1;
          }
        }
      }
      var obj = [keys[i], data[keys[i]].length, ammountR, ammountE, done, todo,other];
      theData.push(obj);
    }
    var table = $('#exampleCompany').DataTable({
      data: theData
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

});