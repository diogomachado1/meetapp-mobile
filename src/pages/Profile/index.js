import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useForm from 'react-hook-form';
import Button from '~/components/Button';
import { signUpRequest, signOut } from '~/store/modules/auth/actions';

import { Background } from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const profile = useSelector(state => state.user.profile);
  const { register, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function onSubmit(value) {
    console.tron.log(value);
    // dispatch(updateProfileRequest(data));
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            ref={register({ name: 'name' })}
            autoCorrect={false}
            placeholder="Nome completo"
            returnKeyType="next"
            defaultValue={profile.name}
            onSubmitEditing={() => emailRef.current.focus()}
            onChangeText={text => setValue('name', text)}
          />
          <FormInput
            ref={register({ name: 'email' })}
            autoCorrect={false}
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            defaultValue={profile.email}
            onSubmitEditing={() => emailRef.current.focus()}
            onChangeText={text => setValue('email', text)}
          />

          <Button onPress={handleSubmit(onSubmit)}>Alterar</Button>
          <Button onPress={() => dispatch(signOut())}>Sair</Button>
        </Form>
      </Container>
    </Background>
  );
}

/*

    <FormInput
            ref={register({ name: "email" })}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={text => setValue('email', text)}
          />

<FormInput
ref={register({ name: password })}
secureTextEntry
placeholder="Sua senha secreta"
ref={passwordRef}
returnKeyType="send"
onSubmitEditing={handleSubmit}
value={password}
onChangeText={text => setValue('password', text)}
/> */
