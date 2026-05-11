from flask import Flask, request, jsonify
from flask_cors import CORS 
from dotenv import load_dotenv

load_dotenv()
trechos = [
    {
        "trecho": "Rodo Anel",
        "kmInicial": 0,
        "kmFinal": 10,
        "tipoVegetacao": "Gramínea",
        "tamanho": 18,
        "status": "",
        "latitudeInicial":"46.0347",
        "longitudeInicial":"-122.0961",
        "latitudeFinal":"46.0345",
        "longitudeFinal":"-122.0959"
    },
    {
        "trecho": "RioSP",
        "kmInicial": 10,
        "kmFinal": 20,
        "tipoVegetacao": "Arbustiva",
        "tamanho": 29,
        "status": "",
        "latitudeInicial":"50.0390",
        "longitudeInicial":"-130.0961",
        "latitudeFinal":"50.0392",
        "longitudeFinal":"-130.0961"
    },
    {
        "trecho": "Motiva Sorocabana",
        "kmInicial": 20,
        "kmFinal": 30,
        "tipoVegetacao": "Florestal",
        "tamanho": 45,
        "status": ""
    },
    {
        "trecho": "Motiva Sorocabana",
        "kmInicial": 10,
        "kmFinal": 20,
        "tipoVegetacao": "Arbustiva",
        "tamanho": 19,
        "status": ""
    },
    {
        "trecho": "RioSP",
        "kmInicial": 40,
        "kmFinal": 50,
        "tipoVegetacao": "Arbustiva",
        "tamanho": 22,
        "status": ""
    },
    {
        "trecho": "Rodo Anel",
        "kmInicial": 10,
        "kmFinal": 20,
        "tipoVegetacao": "Arbustiva",
        "tamanho": 30,
        "status": ""
    },
    {
        "trecho": "ViaLagos",
        "kmInicial": 40,
        "kmFinal": 50,
        "tipoVegetacao": "Arbustiva",
        "tamanho": 27,
        "status": ""
    },
    {
        "trecho": "ViaLagos",
        "kmInicial": 70,
        "kmFinal": 80,
        "tipoVegetacao": "Arbustiva",
        "tamanho": 43,
        "status": ""
    },
]

def definindoStatus ():
    for i in range (len(trechos)):
        trechos[i]["status"] = "Em dia" if trechos[i]["tamanho"] < 20 else "Alerta" if trechos[i]["tamanho"] < 30 else "Atrasado"

def ordenandoTrechos():
    prioridade = {
    "Atrasado": 0,
    "Alerta": 1,
    "Em dia": 2
    }
    trechos_ordenados = sorted(
    trechos, 
    key=lambda x: (prioridade.get(x["status"], 3), -x["tamanho"])
    )
    return trechos_ordenados

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/info-trecho', methods=['GET'])
def pegandoInfos():
    return jsonify(trechos)


if __name__== '__main__':
    definindoStatus()
    trechos = ordenandoTrechos()
    app.run(debug=True, port=5000)