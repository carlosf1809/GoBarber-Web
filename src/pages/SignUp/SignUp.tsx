import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail,FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';    
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link  } from 'react-router-dom';

import logoImg from '../../assets/logo.svg'

import {Container, Content, AnimationContainer, Background} from './styles'

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    
    console.log(formRef);

    const handleSubmit = useCallback(async (data: object ) => {
        try{
            formRef.current?.setErrors({}); 

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatótorio'),
                email: Yup.string().required('E-mail obrigatótorio').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Senha min. 6 digitos'),
                
            });

            await schema.validate(data, {abortEarly:false});

            
        } catch(err) {
            console.log(err);

            const errors = getValidationErros(err);

            formRef.current?.setErrors(errors); 
        }
    },[]);
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