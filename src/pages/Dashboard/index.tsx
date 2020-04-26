import React, { useState, FormEvent, useEffect} from 'react';
import { Title, Form, Repositories, Error } from './styles';
import {  FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';


import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

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
  const [ repositories, setRepositories] = useState<Repository[]>(() =>{
    const storageRepositories = localStorage.getItem('@GitHubExplore: repositories')
    if( storageRepositories){
      return JSON.parse(storageRepositories)
    }else{
      return [];
    }
  })
  const [ inputError, setInputError] = useState('')
  const [newrepo, setNewrepo] = useState('')

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplore: repositories',
      JSON.stringify(repositories)
    )
  }, [repositories])
  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
    event.preventDefault();
    if(!newrepo){
      setInputError('Digite o auto/nome do repositório!');
      return;
    }
    try{
      //Adição de um novo repositorio
      const response = await api.get<Repository>(`repos/${newrepo}`)
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewrepo( '')
      setInputError('')
    }catch(err){
      setInputError('Erro na busca desse repositorio')
    }
  }

  return (
    <>
      <img src={ logoImg} alt ="GitHub Explorer" />
      <Title> DashBoard</Title>
      <Form  hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Digite o nome do respositorio"
          value={ newrepo}
          onChange={ e => setNewrepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error> }
      <Repositories>
       { repositories.map(repository => (
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}` } className="href">
            <img
              src={ repository.owner.avatar_url}
              alt={ repository.owner.login}
            />
            <div>
              <strong>{ repository.full_name}</strong>
              <p>{ repository.description }</p>
            </div>
           <FiChevronRight size = {20} />
         </Link>
       ))}
      </Repositories>
    </>
  )
}

export default Dashboard;
