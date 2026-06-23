from flask import Flask, jsonify
from flask_cors import CORS 
from dotenv import load_dotenv
import os
from supabase import create_client, Client

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def buscar_dados():
    try:
        response = supabase.table("Rodovias").select("*").execute()
        
        dados = response.data
        return dados
        
    except Exception as e:
        print(f"Erro ao buscar dados: {e}")
        return None


def definindoStatus (dados):
    for i in range (len(dados)):
        dados[i]["status"] = "Em dia" if dados[i]["tamanho"] < 15 else "Alerta" if dados[i]["tamanho"] < 25 else "Atrasado"

def ordenandoTrechos(dados):
    prioridade = {
    "Atrasado": 0,
    "Alerta": 1,
    "Em dia": 2
    }
    trechos_ordenados = sorted(
    dados, 
    key=lambda x: (prioridade.get(x["status"], 3), -x["tamanho"])
    )
    return trechos_ordenados

def atualizarTrechos(dados):
    for trecho in dados:
        supabase.table("Rodovias").update({"status": trecho["status"]}).eq("id", trecho["id"]).execute()

@app.route('/info-trecho', methods=['GET'])
def pegandoInfos():
    dados_banco = buscar_dados()

    if not dados_banco:
        return jsonify([]) 
    
    definindoStatus(dados_banco)
    trechos_finais = ordenandoTrechos(dados_banco)
    atualizarTrechos(trechos_finais)
    
    return jsonify(trechos_finais)

if __name__== '__main__':
    app.run(debug=True, port=5000)