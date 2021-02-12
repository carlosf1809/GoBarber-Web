import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail,FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';    
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.svg'

import {Container, Content, AnimationContainer, Background} from './styles'



interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }

  

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
  
    
    console.log(formRef);

    const handleSubmit = useCallback(async (data: SignUpFormData ) => {
        try{
            formRef.current?.setErrors({}); 

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatótorio'),
                email: Yup.string().required('E-mail obrigatótorio').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Senha min. 6 digitos'),
                
            });

            await schema.validate(data, {abortEarly:false});
            
            await api.post('/users', data);

            history.push('/');

            !!addToast && addToast({
            type: 'success',
            title: 'Cadastro realizado!',
            description: 'Você já pode fazer seu logon no GoBarber!',
            });

            } catch(err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErros(err);
          
                    formRef.current?.setErrors(errors);
          
                    return;
                  }
          
                  !!addToast && addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
                  });
                }
    },[addToast, history]);
    return (
        <Container>
        <Background></Background>
        <Content>
            <AnimationContainer>
                <img src={logoImg} alt="GoBarber"/>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome"/>

                    <Input name="email" icon={FiMail} placeholder="E-mail"/>

                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                    <Button type="submit">Cadastrar</Button>

                </Form>

                <Link to="/">
                        <FiArrowLeft/>    
                        Voltar para logon
                </Link>
            </AnimationContainer>
        </Content>
    </Container>
    );
}

export default SignUp;