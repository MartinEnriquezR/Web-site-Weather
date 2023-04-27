const api = 'https://redcalidadaire.upiita.ipn.mx/api/'; 

window.onload = function(){

//axios get request
axios({
        method: 'get',
        url: api + 'data/data-information/'
    })
.then((response)=>{
    //show this information in the index.html
    let firstDate = response.data[0].first_date;
    let lastDate = response.data[0].last_date;
    let firstTime = response.data[0].first_time;
    let lastTime = response.data[0].last_time;

    let element = document.getElementById('data-information');
    element.innerHTML = `
    <p>Primer registro: ${firstDate} ${firstTime}</p>
    <p>Último registro: ${lastDate} ${lastTime}</p>
    `

})
.catch((error)=>{
    alert(error.response.data.non_field_errors[0]);
})

}