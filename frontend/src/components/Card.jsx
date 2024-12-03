import React, { useEffect, useState } from 'react';

function Card({ tarefa, buscarTarefas }) {
  const [editedJob, setEditedJob] = useState({ ...tarefa });
  // const [isAluguelModalOpen, setIsAluguelModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [aluguelData, setAluguelData] = useState({
    id_usuario: '',
    data_aluguel: ''
  });
   useEffect(() => {console.log(tarefa)},[tarefa])

   
  const alterarSituacao = async (novaSituacao) => {

      atualizarTarefa(novaSituacao)
 
  };

  const atualizarTarefa = async (novaSituacao) => {
    const body = { ...tarefa, status: novaSituacao };
    // if (dadosAluguel) {
    //   body.id_usuario = dadosAluguel.id_usuario;
    //   body.data_aluguel = dadosAluguel.data_aluguel;
    // }
    console.log(novaSituacao)
    await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    buscarTarefas();
  };

  const salvarAluguel = async () => {
    await atualizarTarefa('fazendo');
    // setIsAluguelModalOpen(false);
    // setAluguelData({ id_usuario: '', data_aluguel: '' });
  };

  const editarTarefa = async () => {
    await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedJob)
    });
    buscarTarefas();
    setIsEditModalOpen(false);
  };

  const deletarTarefa = async () => {
    const confirmed = window.confirm("Tem certeza de que deseja deletar este tarefa?");
    if (confirmed) {
      await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, { method: 'DELETE' });
      buscarTarefas();
    }
  };

  return (
    <div className="card">
      <h3>{tarefa.descricao}</h3>
      <p>Descrição: {tarefa.setor}</p>
      <p>Prioridade: {tarefa.prioridade}</p>
      <p>Usuário: {tarefa.id_usuario}</p>
      {/* <p>Situação: {tarefa.status}</p> */}
      
      {tarefa.status === 'afazer' && (
        <>
          <button onClick={() => atualizarTarefa('fazendo')}>Fazendo</button>
          <button onClick={() => alterarSituacao('pronto')}>Pronto</button>
        </>
      )}

      {tarefa.status === 'fazendo' && (
        <>
        <button onClick={() => alterarSituacao('afazer')}>A Fazer</button>
        <button onClick={() => alterarSituacao('fazendo')}>Pronto</button>
        </>
        
      )}

      {tarefa.status === 'pronto' && (
        <>
        <button onClick={() => alterarSituacao('afazer')}>A Fazer</button>
        <button onClick={() => alterarSituacao('fazendo')}>Fazendo</button>
        </>
        
      )}

      <button onClick={() => setIsEditModalOpen(true)}>Editar</button>
      <button onClick={deletarTarefa}>Deletar</button>

      {/* {isAluguelModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registrar Aluguel</h2>
            <input
              placeholder="ID do Usuário"
              value={aluguelData.id_usuario}
              onChange={(e) => setAluguelData({ ...aluguelData, id_usuario: e.target.value })}
            />
            <button onClick={salvarAluguel}>Confirmar Aluguel</button>
            <button onClick={() => setIsAluguelModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )} */}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Tarefa</h2>
            <input
              value={editedJob.modelo}
              onChange={(e) => setEditedJob({ ...editedJob, descricao: e.target.value })}
              placeholder="Modelo"
            />
            <input
              value={editedJob.cor}
              onChange={(e) => setEditedJob({ ...editedJob, setor: e.target.value })}
              placeholder="Cor"
            />
            <input
              type="number"
              value={editedJob.km}
              onChange={(e) => setEditedJob({ ...editedJob, prioridade: parseInt(e.target.value) })}
              placeholder="KM"
            />
            <button onClick={editarTarefa}>Salvar</button>
            <button onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
