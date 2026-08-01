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

@app.route('/historico/pegar', methods = ['GET'])
def pegando_historico():
    try:
        response = supabase.table('Historico').select("*").execute()
        dados = response.data
        return jsonify(dados)
    except Exception as e:
        print(f"Algo deu errado ao pegar os dados do historico :{e}")

@app.route('/historico/dashboard', methods = ['GET'])
def pegando_dashboard():
    try:
        response = supabase.rpc('get_top_historico').execute()
        dados_historico = response.data if response.data else []
        return jsonify(dados_historico)
    
    except Exception as e:
        print(f"Erro ao buscar dados do histórico: {e}")
        return jsonify([])


@app.route('/historico/adicionar', methods = ['POST'])
def adicionando_item_historico():

    dados_front = request.get_json()
    try:
        novo_corte = {
            "nomeTrecho": dados_front.get("nomeTrecho"),
            "kmInicial": dados_front.get("kmInicial"),
            "kmFinal": dados_front.get("kmFinal"),
            "funcionario": dados_front.get("funcionario"),
            "tipoVegetacao": dados_front.get("vegetacao"),
            "dataCorte": datetime.date.today().isoformat(),
        }
        response = supabase.table("Historico").insert(novo_corte).execute()
        return jsonify({"status": "sucesso", "dados": response.data}), 201

    except Exception as e:
        print(f"Erro ao adicionar corte ao histórico: {e}")
        return jsonify({"status": "erro", "mensagem": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5002, debug=True)