import React, {useCallback} from 'react';
import { FiArrowLeft, FiMail,FiUser, FiLock } from 'react-icons/fi'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import logoImg from '../../assets/logo.svg'

import {Container, Content, Background} from './styles'

const SignUp: React.FC = () => {
    const handleSubmit = useCallback(async (dados: object ) => {
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatótorio'),
                email: Yup.string().required('E-mail obrigatótorio').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Senha min. 6 digitos'),
                
            });

            await schema.validate(dados, {abortEarly:false});
        } catch(error) {
            console.log(error)
        }
    },[]);
    return (
        <Container>
        <Background></Background>
        <Content>
            <img src={logoImg} alt="GoBarber"/>

            <Form onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome"/>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>

                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                <Button type="submit">Cadastrar</Button>

            </Form>

            <a href="#">
                    <FiArrowLeft/>    
                    Voltar para logon
            </a>

        </Content>
    </Container>
    );
}

export default SignUp;