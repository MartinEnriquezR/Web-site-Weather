//script to get and represent data per hour


const form = document.getElementById('data-per-hour-form');
const api = 'http://127.0.0.1:8000/';
var wind_dir_arr = [];
 


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
        removeData(wind_speed_chart);
        //reset the wind_dir_arr
        wind_dir_arr = [];

        //iterate over the response data
        for (let i = 0; i < response.data.length; i++) {
            //populate wind_dir_arr
            wind_dir_arr.push(response.data[i].wind_dir);
            addData(wind_speed_chart, response.data[i].date_time, response.data[i].wind_speed);
        }
    })
    .catch((error)=>{
        alert(error.response.data.non_field_errors[0]);
    })
})


//line chart for wind speed
const wind_speed_elem = document.getElementById('wind-speed');
const wind_speed_chart = new Chart(wind_speed_elem, {
    
  type: 'line', //type of chart
  
  data: {

    labels: [],
    datasets: [{
      label: "Velocidad del viento",
      yAxisID: "velocidad",
      data: [],
      borderColor: "blue",
      fill: true
    }]

  },

  options: {
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