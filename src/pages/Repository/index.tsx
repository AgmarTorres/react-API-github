import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () =>{
  const {params} = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <img src ={ logoImg} alt= 'GitHub Explorer'/>
          <Link to='/'>
            <FiChevronLeft size={16} />
            Voltar
          </Link>
       </Header>
      <RepositoryInfo>
        <header>
          <img src="img" alt="test"/>
          <div>
            <strong> Opa/ opa</strong>
            <p>Descricao</p>
          </div>
        </header>
        <ul>
          <li>
            <strong> </strong>
            <span> Teste </span>
          </li>

        </ul>
      </RepositoryInfo>
      <Issues>
        <Link  to="asds" className="href">
            <div>
              <strong></strong>
              <p></p>
            </div>
           <FiChevronRight size = {20} />
         </Link>

      </Issues>
    </>
  )
}

export default Repository;
