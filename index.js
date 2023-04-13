const express = require('express');
const port=process.env.PORT || 9090;

const app = express();

curso = '';
modulos = [];
pago = '';
var totalPagar = 0;

// API MIDDLEWARES

app.use(express.json());

app.use(express.urlencoded());

app.use(express.static('public'));

// API ROUTES
// Escoger curso
app.get('/curso', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
} )

app.post('/curso', (req, res) => {
    curso = req.body.curso
    console.log(req.body);
    console.log("CURSO: ", curso);
    res.sendFile(__dirname + '/public/modulos.html')

    if (curso == 'java') {
        curso = 'Java';
    } else if (curso == 'php') {
        curso = 'PHP';
    } else if (curso == 'net') {
        curso = '.NET';
    }

})

// Escoger modulos
// Modulo de java = S/1200 - Modulo de php = S/800 - Modulo de .net = S/1500
// Si se paga en efectivo se aplica un descuento del 10%
app.get('/modulos', (req, res) => {
    res.sendFile(__dirname + '/public/modulos.html');
} )

app.post('/modulos', (req, res) => {   
    console.log("Avanzado: ", req.body.modulo.length);

    if (req.body.modulo.length < 2 || req.body.modulo.length > 4) {
        modulos.push(req.body.modulo);
    } else {
        for (var i = 0; i < req.body.modulo.length; i++) {
        
            modulos.push(req.body.modulo[i]);
        }
    };
    
    
    console.log("FINAL MODULOS", modulos);

    res.sendFile(__dirname + '/public/pago.html')
})

// Escoger tipo de pago
app.get('/pago', (req, res) => {
    res.sendFile(__dirname + '/public/pago.html');  
} )

app.post('/pago', (req, res) => {
    console.log("TIPO DE PAGO: ", req.body.pago);
    pago = req.body.pago

    if (curso == 'Java') {
        totalPagar = 1200 * modulos.length;
    } else if (curso == 'PHP') {
        totalPagar = 800 * modulos.length;
    } else if (curso == '.NET') {
        totalPagar = 1500 * modulos.length;
    }

    if (pago == 'efectivo') {
        totalPagar = totalPagar - (totalPagar * 0.1);
    }

    if (pago == 'tarjeta') {
        pago = 'Tarjeta de credito';
    } else if (pago == 'efectivo') {
        pago = 'Efectivo';
    }

    console.log(req.body);

    res.end(`<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Matricula</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet">
        <script>"node_modules/bootstrap/dist.js/bootstrap.bundle.js"</script>
    </head>
    <body>
    <body style="font-family: 'Poppins', sans-serif;">

    <div class="section m-5">
        <ul class="list-group">
            <li class="list-group-item active" aria-current="true">Detalle</li>
            <li class="list-group-item">Curso: ${curso}</li>
            <li class="list-group-item">Modulos: ${modulos}</li>
            <li class="list-group-item">Tipo de pago: ${pago}</li>
            <li class="list-group-item">*Si el tipo de pago es en efectivo tiene un 10% de descuento.</li>
            <li class="list-group-item">Total a pagar: S/${totalPagar}</li>
        </ul>
    </div>

    

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        </body>
    </html>`);
    })

app.listen(port, () => {
    console.log('Servidor iniciado en http://localhost:9090');
})
