import React, { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [tarefas, settarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isAddingTarefa, setIsAddingTarefa] = useState(false);
  const [isAddingUsuario, setIsAddingUsuario] = useState(false);
  const [novoTarefa, setNovoTarefa] = useState({
    descricao: '',
    setor: '',
    prioridade: '',
    id_usuario: '',
    status: 'afazer'
  });
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
  });

  // versão compacta que serve para todos os status
  const filtrotarefasPorStatus = (status) => tarefas.filter(tarefa => tarefa.status === status);

  // versão para criar uma função para cada status diferente (usei no disponivel para exemplificar)
  function filtrarDisponiveis(){
    return tarefas.filter(tarefa => tarefa.status === 'afazer');
  }

  function adicionarTarefa() {
    setIsAddingTarefa(true);
  }

  function adicionarUsuario() {
    setIsAddingUsuario(true);
  }

  const salvarTarefa = async () => {
    try {
      await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoTarefa),
      });
      setIsAddingTarefa(false);
      setNovoTarefa({ descricao: '', setor: '', prioridade: '' });
      buscartarefas();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const salvarUsuario = async () => {
    try {
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
      });
      setIsAddingUsuario(false);
      setNovoUsuario({ nome: ''});
      buscarUsuarios();
    } catch (error) {
      console.error('Erro ao salvar usuario:', error);
    }
  };

  const buscartarefas = async () => {
    try {
      const response = await fetch('http://localhost:3000/tarefas');
      const data = await response.json();
      settarefas(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const buscarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuarios:', error);
    }
  };

  useEffect(() => {
    buscartarefas();
    buscarUsuarios();
  }, []);

  return (
    <div>
      <header>
        <h1>Gerenciamento de Tarefas</h1>
        <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
        <button onClick={adicionarUsuario}>Adicionar Usuario</button>
      </header>
      <div className="dashboard">
        <div className="coluna-dashboard">
          <h2>A Fazer</h2>
          {filtrotarefasPorStatus('afazer').map(tarefa => (
            <Card key={tarefa.id} tarefa={tarefa} buscarTarefas={buscartarefas} usuarios={usuarios} />
          ))}
          {/* {filtrarDisponiveis().map(tarefa => (
            <Card key={tarefa.id} tarefa={tarefa} buscarTarefas={buscartarefas} usuarios={usuarios} />
          ))} */}
        </div>
        <div className="coluna-dashboard">
          <h2>Fazendo</h2>
          {filtrotarefasPorStatus('fazendo').map(tarefa => (
            <Card key={tarefa.id} tarefa={tarefa} buscarTarefas={buscartarefas} usuarios={usuarios} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Pronto</h2>
          {filtrotarefasPorStatus('pronto').map(tarefa => (
            <Card key={tarefa.id} tarefa={tarefa} buscarTarefas={buscartarefas} usuarios={usuarios} />
          ))}
        </div>
      </div>
      {isAddingTarefa && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Tarefa</h2>
            <input
              type="text"
              placeholder="Descrição"
              value={novoTarefa.descricao}
              onChange={(e) => setNovoTarefa({ ...novoTarefa, descricao: e.target.value })}
            />
            <input
              type="text"
              placeholder="Setor"
              value={novoTarefa.setor}
              onChange={(e) => setNovoTarefa({ ...novoTarefa, setor: e.target.value })}
            />
            <input
              type="text"
              placeholder="Prioridade"
              value={novoTarefa.prioridade}
              onChange={(e) => setNovoTarefa({ ...novoTarefa, prioridade: e.target.value })}
            />
              <input
              type="number"
              placeholder="ID do Usuário"
              value={novoTarefa.id_usuario}
              onChange={(e) => setNovoTarefa({ ...novoTarefa, id_usuario: e.target.value })}
            />
            <button onClick={salvarTarefa}>Salvar</button>
            <button onClick={() => setIsAddingTarefa(false)}>Cancelar</button>
          </div>
        </div>
      )}
      {isAddingUsuario && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Usuario</h2>
            <input
              placeholder="Nome"
              value={novoUsuario.nome}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
            />
            <button onClick={salvarUsuario}>Salvar</button>
            <button onClick={() => setIsAddingUsuario(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;