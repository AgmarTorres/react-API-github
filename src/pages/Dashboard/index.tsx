import React, { useState, FormEvent} from 'react';
import { Title, Form, Repositories } from './styles';
import {  FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import Repository from '../Repository';

interface Repository{
  //Não é necessario colocar a tipagem do que o repositorio vai ter
  full_name: string;
  description: string;
  owner:{
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () =>{
  const [ repositories, setRepositories] = useState<Repository[]>([])
  const [newrepo, setNewrepo] = useState('')

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault();
    //Adição de um novo repositorio
    const response = await api.get<Repository>(`repos/${newrepo}`)
    const repository = response.data;
    setRepositories([...repositories, repository]);
    setNewrepo( '')
  }


  return (
    <>
      <img src={ logoImg} alt ="GitHub Explorer" />
      <Title> DashBoard</Title>
      <Form action="" onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Digite o nome do respositorio"
          value={ newrepo}
          onChange={ e => setNewrepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
       { repositories.map(repository => (
          <a key={repository.full_name} href="test" className="href">
            <img
              src={ repository.owner.avatar_url}
              alt={ repository.owner.login}
            />
            <div>
              <strong>{ repository.full_name}</strong>
              <p>{ repository.description }</p>
            </div>
           <FiChevronRight size = {20} />
         </a>


       ))}


      </Repositories>
    </>
  )
}

export default Dashboard;
