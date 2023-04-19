//script to get and represent data per hour


const form = document.getElementById('data-per-hour-form');
const api = 'https://redcalidadaire.upiita.ipn.mx/';  
var wind_dir_arr = [];
var hi_dir_arr = [];


//listen for submit event on the <form> element
form.addEventListener('submit',(event)=>{
    
    //prevent the default action of the submit event
    event.preventDefault();
    
    ///get the form data
    const formData = new FormData(form);
    const data = {};
    
    for (const [key,value] of formData.entries()) {
        data[key] = value;
    }

    //axios request
    axios({
      method: 'post',
      url: api + 'data/data-per-hour/',
      data:{
        "year":data['date'].split('-')[0],
        "month":data['date'].split('-')[1],
        "day":data['date'].split('-')[2],
        "hour":data['hour']
      }
    })
    .then((response)=>{

        //remove all the data from the charts before adding new data
        removeData(temp_out_chart);
        removeData(hi_temp_chart);
        removeData(low_temp_chart);
        removeData(out_hum_chart);
        removeData(wind_speed_chart);
        removeData(dew_point_chart);
        removeData(wind_chill_chart);
        removeData(wind_run_chart);
        removeData(hi_speed_chart);
        removeData(heat_index_chart);
        removeData(thw_index_chart);
        removeData(barometer_chart);
        removeData(rain_chart);
        removeData(rain_rate_chart);
        removeData(heating_degree_day_chart);
        removeData(cooling_degree_day_chart);
        removeData(in_temp_chart);
        removeData(in_hum_chart);
        removeData(in_dew_chart);
        removeData(in_heat_chart);
        removeData(in_emc_chart);
        removeData(in_air_density_chart);
        removeData(wind_samp_chart);
        removeData(wind_tx_chart);
        removeData(iss_recept_chart);
        removeData(arc_int_chart);
        //reset the arrays
        wind_dir_arr = [];
        hi_dir_arr = [];


        //iterate over the response data
        for (let i = 0; i < response.data.length; i++) {
            //add the data for the temperature outside chart
            addData(temp_out_chart, response.data[i].date_time, response.data[i].temp_out);
            //add the data for the high temperature chart
            addData(hi_temp_chart, response.data[i].date_time, response.data[i].hi_temp);
            //add the data for the low temperature chart
            addData(low_temp_chart, response.data[i].date_time, response.data[i].low_temp);
            //add the data for the outside humidity chart
            addData(out_hum_chart, response.data[i].date_time, response.data[i].out_hum);
            //add the data for the wind speed chart
            addData(wind_speed_chart, response.data[i].date_time, response.data[i].wind_speed);
            //add the data for the dew point chart
            addData(dew_point_chart, response.data[i].date_time, response.data[i].dew_pt);
            //add the data for the wind chill chart
            addData(wind_chill_chart, response.data[i].date_time, response.data[i].wind_chill);
            //add the data for the wind run chart
            addData(wind_run_chart, response.data[i].date_time, response.data[i].wind_run);
            //add the data for the high speed chart
            addData(hi_speed_chart, response.data[i].date_time, response.data[i].hi_speed);
            //add the data for the heat index chart
            addData(heat_index_chart, response.data[i].date_time, response.data[i].heat_index);
            //add the data for the thw index chart
            addData(thw_index_chart, response.data[i].date_time, response.data[i].thw_index);
            //add the data for the barometer chart
            addData(barometer_chart, response.data[i].date_time, response.data[i].bar);
            //add the data for the rain chart
            addData(rain_chart, response.data[i].date_time, response.data[i].rain);
            //add the data for the rain rate chart
            addData(rain_rate_chart, response.data[i].date_time, response.data[i].rain_rate);
            //add the data for the heating degree day chart
            addData(heating_degree_day_chart, response.data[i].date_time, response.data[i].heat_dd);
            //add the data for the cooling degree day chart
            addData(cooling_degree_day_chart, response.data[i].date_time, response.data[i].cool_dd);
            //add the data for in temperature chart
            addData(in_temp_chart, response.data[i].date_time, response.data[i].in_temp);
            //add the data for in humidity chart
            addData(in_hum_chart, response.data[i].date_time, response.data[i].in_hum);
            //add the data for in dew chart
            addData(in_dew_chart, response.data[i].date_time, response.data[i].in_dew);
            //add the data for in heat chart
            addData(in_heat_chart, response.data[i].date_time, response.data[i].in_heat);
            //add the data for in emc chart
            addData(in_emc_chart, response.data[i].date_time, response.data[i].in_emc);
            //add the data for in air density chart
            addData(in_air_density_chart, response.data[i].date_time, response.data[i].in_air_density);
            //add the data for wind sample chart
            addData(wind_samp_chart, response.data[i].date_time, response.data[i].wind_samp);
            //add the data for wind tx chart
            addData(wind_tx_chart, response.data[i].date_time, response.data[i].wind_tx);
            //add the data for iss recept chart
            addData(iss_recept_chart, response.data[i].date_time, response.data[i].iss_recept);
            //add the data for arc int chart
            addData(arc_int_chart, response.data[i].date_time, response.data[i].arc_int);

            //populate the arrays
            wind_dir_arr.push(response.data[i].wind_dir);
            hi_dir_arr.push(response.data[i].hi_dir);
        }
    })
    .catch((error)=>{
        alert(error.response.data.non_field_errors[0]);
    })
})


//charts
//line chart for temperature outside
const temp_out_elem = document.getElementById('temp-out');
const temp_out_chart = new Chart(temp_out_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Temperature outside',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for high temperature
const hi_temp_elem = document.getElementById('hi-temp');
const hi_temp_chart = new Chart(hi_temp_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'High temperature',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for low temperature
const low_temp_elem = document.getElementById('low-temp');
const low_temp_chart = new Chart(low_temp_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Low temperature',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for outside humidity
const out_hum_elem = document.getElementById('out-hum');
const out_hum_chart = new Chart(out_hum_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Outside humidity',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for wind speed
const wind_speed_elem = document.getElementById('wind-speed');
const wind_speed_chart = new Chart(wind_speed_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Wind speed',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
          callbacks: {
              title: function(context) {
                  return 'Wind Direction: ' + wind_dir_arr[context[0].dataIndex];
              }
          }
      }
  }
  }

});

//line chart for dew point
const dew_point_elem = document.getElementById('dew-point');
const dew_point_chart = new Chart(dew_point_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Dew point',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for wind chill
const wind_chill_elem = document.getElementById('wind-chill');
const wind_chill_chart = new Chart(wind_chill_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Wind chill',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for wind run
const wind_run_elem = document.getElementById('wind-run');
const wind_run_chart = new Chart(wind_run_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Wind run',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for hi speed
const hi_speed_elem = document.getElementById('high-speed');
const hi_speed_chart = new Chart(hi_speed_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'High speed',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
          callbacks: {
              title: function(context) {
                  return 'Direction: ' + hi_dir_arr[context[0].dataIndex];
              }
          }
      }
    }
  }

});

//line chart for heat index
const heat_index_elem = document.getElementById('heat-index');
const heat_index_chart = new Chart(heat_index_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Heat index',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart  for thw index
const thw_index_elem = document.getElementById('thw-index');
const thw_index_chart = new Chart(thw_index_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'THW index',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for barometer
const barometer_elem = document.getElementById('barometer');
const barometer_chart = new Chart(barometer_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Barometer',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for rain
const rain_elem = document.getElementById('rain');
const rain_chart = new Chart(rain_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Rain',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for rain rate
const rain_rate_elem = document.getElementById('rain-rate');
const rain_rate_chart = new Chart(rain_rate_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Rain rate',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart heating degree day
const heating_degree_day_elem = document.getElementById('heating-degree-day');
const heating_degree_day_chart = new Chart(heating_degree_day_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Heating degree day',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for cooling degree day
const cooling_degree_day_elem = document.getElementById('cooling-degree-day');
const cooling_degree_day_chart = new Chart(cooling_degree_day_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Cooling degree day',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for in temp
const in_temp_elem = document.getElementById('in-temp');
const in_temp_chart = new Chart(in_temp_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'In temperature',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for in humidity
const in_hum_elem = document.getElementById('in-hum');
const in_hum_chart = new Chart(in_hum_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'In humidity',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for in dew
const in_dew_elem = document.getElementById('in-dew');
const in_dew_chart = new Chart(in_dew_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'In dew',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for in heat
const in_heat_elem = document.getElementById('in-heat');
const in_heat_chart = new Chart(in_heat_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'In heat',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

}); 

//line chart for in emc
const in_emc_elem = document.getElementById('in-emc');
const in_emc_chart = new Chart(in_emc_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'In EMC',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for in air density
const in_air_density_elem = document.getElementById('in-air-density');
const in_air_density_chart = new Chart(in_air_density_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'In Air Density',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for wind samp
const wind_samp_elem = document.getElementById('wind-samp');
const wind_samp_chart = new Chart(wind_samp_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Wind Samp',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for wind tx
const wind_tx_elem = document.getElementById('wind-tx');
const wind_tx_chart = new Chart(wind_tx_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Wind Tx',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for iss recept
const iss_recept_elem = document.getElementById('iss-recept');
const iss_recept_chart = new Chart(iss_recept_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'ISS Recept',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});

//line chart for arc int
const arc_int_elem = document.getElementById('arc-int');
const arc_int_chart = new Chart(arc_int_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'Arc Int',
      data: [], //data for the chart
      borderWidth: 1
    }]
  },

  options: {  //options for the chart
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});


//utility functions
// updating any given chart with a new label and data
function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

//removing all the data and the labels in a given chart
function removeData(chart) {
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
  });
  chart.update();
}