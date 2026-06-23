from flask import Flask, jsonify, request
import datetime
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

@app.route ('/solicitacoes/geral', methods = ['GET'])
def buscar_dados_solicitacao():
    try:
        response = supabase.table("Solicitacoes").select("*").execute()
        dados = response.data
        return jsonify(dados)
    except Exception as e:
        print(f"Algo deu errado: {e}")



@app.route('/solicitacoes/porcentagem', methods=['GET'])
def obter_dashboard_solicitacoes():
    try:
        response = supabase.rpc('get_distribuicao_solicitacoes').execute()
        
        dados_dashboard = response.data
        return jsonify(dados_dashboard)
        
    except Exception as e:
        print(f"Erro ao buscar dados do dashboard: {e}")
        return {"total": 0, "distribuicao": []}
    
@app.route('/solicitacoes/cadastro', methods=['POST'])
def cadastrar_solicitacao():
    dados_front = request.get_json()
    
    if not dados_front:
        return jsonify({"erro": "Dados não fornecidos"}), 400
        
    try:
        nova_solicitacao = {
            "id": dados_front.get("id"),
            "nomeTrecho": dados_front.get("nomeTrecho"),
            "kmInicial": dados_front.get("kmInicial"),
            "kmFinal": dados_front.get("kmFinal"),
            "tipoVegetacao": dados_front.get("tipoVegetacao"),
            "latitudeInicial": dados_front.get("latitudeInicial"),
            "latitudeFinal": dados_front.get("latitudeFinal"),
            "longitudeInicial": dados_front.get("longitudeInicial"),
            "longitudeFinal": dados_front.get("longitudeFinal"),
            "dataSolicitacao": datetime.date.today().isoformat(),
            "dataLimite": (datetime.date.today() + datetime.timedelta(days=10)).isoformat()
        }
        
        response = supabase.table("Solicitacoes").insert(nova_solicitacao).execute()
        
        return jsonify({"status": "sucesso", "dados": response.data}), 201
        
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    
if __name__ == '__main__':
    app.run(port=5001, debug=True)