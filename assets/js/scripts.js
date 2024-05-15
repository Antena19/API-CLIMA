//OBTENER LAS REFERENCIAS DEL DOM/HTML
const ciudadInput = document.getElementById("ciudad");
const obtenerPronosticoBtn = document.getElementById("obtenerPronostico");
const pronosticoDiv = document.getElementById("pronostico");

//FUNCION QUE PERMITE OBTENER EL PRONOSTICO
obtenerPronosticoBtn.addEventListener("click", obtenerPronostico);

//CREAMOS FUNCION
function obtenerPronostico(){
    const ciudad = ciudadInput.value.trim();

    //VALIDAR SI EL CAMPO ESTA VACIO
    if (ciudad === ""){
        mostrarError("Ingresa una ciudad");
        return;
    }

    //PEGAR LLAVE API !!!!
    const apiKey = "bd946abd189572000e2eab872dea3ab1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //REALIZAR UNA SOLICITUD HTTP UTILIZANDO LA FUNCION FETCH A LA URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarPronostico(data);
        })
        .catch(error => {
            mostrarError("Error al obtener el pronóstico");
        });
}

//DECLARAR FUNCION: mostrar los datos en el html
function mostrarPronostico(data){
    const {name, main, weather} = data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].description;

    const pronosticoHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}°C</p>
                <p class="card-text">Sensacion: ${sensacion}°C</p>
                <p class="card-text">Humedad: ${humedad}</p>
                <p class="card-text">Descripcion: ${descripcion}</p>
            </div>
        </div>
    `;

    //INSERTAR VARIABLE EN DIV DE HTML
    pronosticoDiv.innerHTML = pronosticoHTML;
}

//FUNCION MOSTRAR ERROR
function mostrarError(mensaje){
    const errorHTML = `
        <div class="alert alert-danger" role="alert"> 
        ${mensaje}
        </div>
    `;
    pronosticoDiv.innerHTML = errorHTML;
}
