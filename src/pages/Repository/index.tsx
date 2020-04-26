import React, { useEffect, useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import  api  from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}


interface Repository{
  //Não é necessario colocar a tipagem do que o repositorio vai ter
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner:{
    login: string;
    avatar_url: string;
  };
}
interface Issue{
  id:number
  title:string;
  login: string;
  html_url:string;
}

const Repository: React.FC = () =>{
  const {params} = useRouteMatch<RepositoryParams>();
  const [ repository, setRepository] = useState<Repository | null>(null);
  const [ issues, setIssues] = useState<Issue[]>([]);

  useEffect(()=>{
    api.get(`repos/${params.repository}`).then( response => {
      setRepository(response.data);
    })
    api.get(`repos/${params.repository}/issues`).then( response => {
      setIssues(response.data);
    })
    /**
     * async function loadData(): Promise<void>{
     *  const repository = await ;
     *  const issues = await ;
     *
     *  const [ repository, issues ] = await Promesi.all([
     *  api.get(`repos/${params.reposutory}`),
     *  api.get(`repos/${params.repository}/issues`)
     *
     * ])
     * }
     */
  },[params.repository])
  return (
    <>
      <Header>
        <img src ={ logoImg} alt= 'GitHub Explorer'/>
          <Link to='/'>
            <FiChevronLeft size={16} />
            Voltar
          </Link>
       </Header>
      { repository && (
      <RepositoryInfo>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
          <div>
            <strong> { repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository.stargazers_count} </strong>
            <span> Stars </span>
          </li>
          <li>
            <strong>{repository.forks_count} </strong>
            <span> Forks </span>
          </li>
          <li>
            <strong>{repository.open_issues_count} </strong>
            <span> Issues </span>
          </li>

        </ul>
      </RepositoryInfo>
    )}
      <Issues>
        {issues.map( issue =>(
          <a key={issue.id} href ={issue.html_url} className="href">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.login}</p>
            </div>
            <FiChevronRight size = {20} />
          </a>
        ))}

      </Issues>
    </>
  )
}

export default Repository;
