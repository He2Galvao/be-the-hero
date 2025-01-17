import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, SetTitle] = useState('');
    const [description, SetDescription] = useState('');
    const [value, SetValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
            console.log(ongId);
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId, 
                }
            })
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Volta para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={ e => SetTitle(e.target.value) } 
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={ e => SetDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={ e => SetValue(e.target.value) } 
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}