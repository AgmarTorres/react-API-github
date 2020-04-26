import React from 'react';
import { Title, Form, Repositories } from './styles';
import {  FiChevronRight } from 'react-icons/fi';


import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () =>{

  return (
    <>
      <img src={ logoImg} alt ="GitHub Explorer" />
      <Title> DashBoard</Title>
      <Form action="" >
        <input type="text" placeholder="Digite o nome do respositorio"/>
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="teste" className="href">
          <img
            src="https://avatars3.githubusercontent.com/u/29600618?s=460&u=e4ef9bd7be29e304fa0c6fecd6ab5c61ccf130cb&v=4"
            alt=""
          />
          <div>
            <strong>RocketSeat</strong>
            <p>Easy peasy gighly scalable ReactJS</p>

          </div>
          <FiChevronRight size = {20} />
        </a>


        <a href="teste" className="href">
          <img
            src="https://avatars3.githubusercontent.com/u/29600618?s=460&u=e4ef9bd7be29e304fa0c6fecd6ab5c61ccf130cb&v=4"
            alt=""
          />
          <div>
            <strong>RocketSeat</strong>
            <p>Easy peasy gighly scalable ReactJS</p>

          </div>
          <FiChevronRight size = {20} />
        </a>


        <a href="teste" className="href">
          <img
            src="https://avatars3.githubusercontent.com/u/29600618?s=460&u=e4ef9bd7be29e304fa0c6fecd6ab5c61ccf130cb&v=4"
            alt=""
          />
          <div>
            <strong>RocketSeat</strong>
            <p>Easy peasy gighly scalable ReactJS</p>

          </div>
          <FiChevronRight size = {20} />
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard;
