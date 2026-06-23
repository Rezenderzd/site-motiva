import subprocess
import sys
import time

def rodar_backends():
    print("🚀 Iniciando todos os serviços de Back-end...")
    
    processos = []
    try:
        p1 = subprocess.Popen([sys.executable, "info-trecho.py"])
        processos.append(p1)
        print("✅ Serviço de Trechos iniciado.")
        
        p2 = subprocess.Popen([sys.executable, "solicitacoes.py"])
        processos.append(p2)
        print("✅ Serviço de Dashboard iniciado.")

        p3 = subprocess.Popen([sys.executable, "historico.py"])
        processos.append(p3)
        print("✅ Serviço de Historico iniciado.")

        
        p4 = subprocess.Popen([sys.executable, "funcionarios.py"])
        processos.append(p4)
        print("✅ Serviço de Funcionários iniciado.")
        
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n🛑 Encerrando todos os back-ends...")
        for p in processos:
            p.terminate()
        print("👋 Todos os serviços foram parados.")

if __name__ == "__main__":
    rodar_backends()