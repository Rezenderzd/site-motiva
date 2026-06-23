from flask import Flask, jsonify, request
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

@app.route('/funcionarios/login', methods = ['POST'])
def verificando_login():
    try:
        dados = request.get_json()

        email = dados.get('email')
        senha = dados.get('senha')

        response = supabase.table('Funcionarios').select('senha').eq('email', email).execute()

        if not response.data:     
            return jsonify(False), 401
            
        senha_no_banco = response.data[0]['senha']
        
        if senha != senha_no_banco:
            return jsonify(False), 401
            
        return jsonify(True), 200
    except Exception as e:
        print(f"Não foi possível fazer a busca no banco de dados:{e}")

@app.route('/funcionarios/mudar-senha', methods = ['POST'])
def mudar_senha():
    try:
        dados = request.get_json()
        senhaNova = dados.get('senhaNova')
        senhaAtual = dados.get('senhaAntiga')
        email = dados.get('email')

        response = supabase.table('Funcionarios').select('senha').eq('email', email).execute()

        if not response.data:
            return jsonify(False)

        senha = response.data[0]['senha']
        
        if senhaAtual != senha:
            return jsonify(False)

        response = supabase.table('Funcionarios').update({'senha': senhaNova}).eq('email', email).execute()

        if response.data:
            return jsonify(True)
        
        return jsonify(False)
    except Exception as e:
        print(f"Algo deu errado ao mudar senha: {e}")

if __name__ == "__main__":
    app.run(port=5003, debug=True)