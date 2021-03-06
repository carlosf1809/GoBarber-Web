import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';  
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth'


import logoImg from '../../assets/logo.svg'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Container, Content, AnimationContainer, Background } from './styles';



interface SignInFormData{
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);


    const { addToast } = useToast();

    const {user, signIn} = useAuth();

    console.log(user)

    const history = useHistory();
    
    const handleSubmit = useCallback(async ( data: SignInFormData ) => {
        try{
            formRef.current?.setErrors({}); 

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatótorio').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),      
            });

            await schema.validate(data, {abortEarly:false});

            !!signIn && await signIn({
                email : data.email,
                password: data.password,
            });

            history.push('/dashboard');

            !!addToast && addToast({
                type: 'success',
                title: 'Login válido',
            });

        } catch(err) {
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErros(err);

                formRef.current?.setErrors(errors); 

                return;
            } 

            !!addToast && addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Erro ao fazer login, cheque as credenciais'
            });
        }
    },[signIn, addToast, history]);

    return( 
    <Container> 
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber"/>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail"/>

                        <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                        <Button type="submit">Entrar</Button>

                        <Link to="#">Esqueci minha senha</Link>
                    </Form>

                    <Link to="/SignUp">
                            <FiLogIn/>    
                            Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            
            <Background></Background>
        </Container>
    )

};

export default SignIn;