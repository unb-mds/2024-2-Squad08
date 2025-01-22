from flask import Flask, request, jsonify
from . import db
from sqlalchemy import or_
from .models import Obra  

app = Flask(__name__)

@app.route('/api/filtrar', methods=['GET'])
def filtrar_obras():
    valores = request.args.get('valores')
    executores = request.args.get('executores')

    filtros = []

    # Filtrando pelo valor
    if valores:
        valorFiltros = valores.split(',')
        for valor in valorFiltros:
            if valor == 'cem':
                filtros.append(Obra.valorInvestimentoPrevisto < 100000)
            elif valor == 'duzentos':
                filtros.append(Obra.valorInvestimentoPrevisto < 200000)
            elif valor == 'trezentos':
                filtros.append(Obra.valorInvestimentoPrevisto < 300000)
            elif valor == 'quinhentos':
                filtros.append(Obra.valorInvestimentoPrevisto < 500000)
            elif valor == 'setecentos':
                filtros.append(Obra.valorInvestimentoPrevisto < 700000)
            elif valor == 'novecentos':
                filtros.append(Obra.valorInvestimentoPrevisto < 900000)
            elif valor == 'milhao':
                filtros.append(Obra.valorInvestimentoPrevisto > 1000000)

    # Filtrando pelo executor
    if executores:
        executoresArray = executores.split(',')
        filtros.append(Obra.executores['nome'].astext.in_(executoresArray))

    # Buscar as obras com base nos filtros
    try:
        obrasFiltradas = Obra.query.filter(or_(*filtros)).all()
        obras_json = [{
            'id': obra.id,
            'nome': obra.nome,
            'uf': obra.uf,
            'situacao': obra.situacao,
            'tipo': obra.tipo,
            'executores': obra.executores,
            'natureza': obra.natureza,
            'endereco': obra.endereco,
            'funcaoSocial': obra.funcaoSocial,
            'dataInicialPrevista': obra.dataInicialPrevista,
            'dataFinalPrevista': obra.dataFinalPrevista,
            'fontesDeRecurso': obra.fontesDeRecurso,
            'valorInvestimentoPrevisto': obra.valorInvestimentoPrevisto,
            'origemRecurso': obra.origemRecurso,
            'qdtEmpregosGerados': obra.qdtEmpregosGerados,
            'geometria': obra.geometria
        } for obra in obrasFiltradas]
        
        return jsonify(obras_json), 200
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({'error': 'Erro ao filtrar as obras'}), 500

if __name__ == '__main__':
    app.run(debug=True)
