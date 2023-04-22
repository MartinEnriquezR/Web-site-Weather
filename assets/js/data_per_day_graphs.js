//script to get and represent data per hour
const form = document.getElementById('data-per-day-form');
const api = 'https://redcalidadaire.upiita.ipn.mx/api/';  
var array = [];

// generate a dictionary of the following values: "temp_out","hi_temp","low_temp","out_hum","dew_pt",
//                        "wind_speed","wind_run","hi_speed",
//                        "wind_chill","heat_index","thw_index","bar","rain","rain_rate","heat_dd",
//                        "cool_dd","in_temp","in_hum","in_dew","in_heat","in_emc",
//                        "in_air_density","wind_samp","wind_tx","iss_recept","arc_int"
const dictionary = {
  "temp_out":"Temperatura exterior",
  "hi_temp":"Temperatura máxima",
  "low_temp":"Temperatura mínima",
  "out_hum":"Humedad exterior",
  "dew_pt":"Punto de rocío",
  "wind_speed":"Velocidad del viento",
  "wind_run":"Recorrido del viento",
  "hi_speed":"Velocidad máxima del viento",
  "wind_chill":"Sensación térmica",
  "heat_index":"Índice de calor",
  "thw_index":"Índice THW",
  "bar":"Presión barométrica",
  "rain":"Lluvia",
  "rain_rate":"Tasa de lluvia",
  "heat_dd":"Grados de calor",
  "cool_dd":"Grados de frío",
  "in_temp":"Temperatura interior",
  "in_hum":"Humedad interior",
  "in_dew":"Punto de rocío interior",
  "in_heat":"Sensación térmica interior",
  "in_emc":"EMC Interior",
  "in_air_density":"Densidad del aire interior",
  "wind_samp":"Muestras de viento",
  "wind_tx":"Tx viento",
  "iss_recept":"Receptor ISS",
  "arc_int":"Intensidad de arco"
}


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
      url: api + 'data/data-per-day/',
      data:{
        "year":data['date'].split('-')[0],
        "month":data['date'].split('-')[1],
        "day":data['date'].split('-')[2],
        "field":data['field'],
      }
    })
    .then((response)=>{

      //show the chart
      chart_elem.style.display = 'block';

      //remove all the data from the chart
      removeData(main_chart);
      //empty the array
      array = [];


      if (data['field'] == 'wind_speed'){ //wind speed case

        //change the label of the chart in the dataset
        main_chart.data.datasets[0].label = 'Velocidad del Viento';

        //change the title of the chart in the tooltip plugin
        main_chart.options.plugins.tooltip.callbacks.title = function(context) {
          return 'Dirección del Viento: ' + array[context[0].dataIndex];
        }

        //iterate over the response data
        for (let i = 0; i < response.data.length; i++) {
          
          //populate the array
          array.push(response.data[i]['wind_dir']);
          
          //add data to the chart
          addData(main_chart, response.data[i]['date_time'], response.data[i][data['field']])
          
        }

      }

      else if (data['field'] == 'hi_speed'){  //high speed case

        //change the label of the chart in the dataset
        main_chart.data.datasets[0].label = 'Velocidad máxima del viento';

        //change the title of the chart in the tooltip plugin
        main_chart.options.plugins.tooltip.callbacks.title = function(context) {
          return 'Dirección: ' + array[context[0].dataIndex];
        }

        //iterate over the response data
        for (let i = 0; i < response.data.length; i++) {
          
          //populate the array
          array.push(response.data[i]['hi_dir']);
          
          //add data to the chart
          addData(main_chart, response.data[i]['date_time'], response.data[i][data['field']])
          
        }

      }

      else{   //usual behaviour

        //change the label of the chart in the dataset
        //main_chart.data.datasets[0].label = data['field'];
        main_chart.data.datasets[0].label = dictionary[data['field']];

        //change the title of the chart in the tooltip plugin
        main_chart.options.plugins.tooltip.callbacks.title = function(context) {
          return 'Fecha y hora: ' + array[context[0].dataIndex];
        }

        //iterate over the response data
        for (let i = 0; i < response.data.length; i++) {
          //populate the array
          array.push(response.data[i]['date_time']);

          //add data to the chart
          addData(main_chart, response.data[i]['date_time'], response.data[i][data['field']])
        }

      }
      
    })
    .catch((error)=>{
        alert(error.response.data.non_field_errors[0]);
    })
})


//chart
//general purpose chart
const chart_elem = document.getElementById('main-chart');
const main_chart = new Chart(chart_elem, {
    
  type: 'line', //type of chart

  data: {
    labels: [], //labels for the chart
    datasets: [{
      label: 'label',
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
                  return '';
              }
          }
      },
      zoom: {
        zoom: {
          drag:{
            enabled: true,
          },
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
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