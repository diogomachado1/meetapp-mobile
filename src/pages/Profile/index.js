import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import useForm from 'react-hook-form';
import { signOut } from '~/store/modules/auth/actions';

import { Background } from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  ErrorText,
  Separator,
  SaveButton,
  ExitButton,
} from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

function covertUndefined(value) {
  return value === '' ? undefined : value;
}

const schema = Yup.object().shape({
  name: Yup.string().transform(covertUndefined),
  email: Yup.string()
    .transform(covertUndefined)
    .email('Insira um e-mail válido'),
  oldPassword: Yup.string()
    .transform(covertUndefined)
    .min(6, 'Minimo 6 caracteres')
    .when('password', (password, field) =>
      password ? field.required('Precisa da sua senha atual') : field
    ),
  password: Yup.string()
    .transform(covertUndefined)
    .min(6, 'Minimo 6 caracteres'),
  confirmPassword: Yup.string()
    .transform(covertUndefined)
    .when('password', (password, field) =>
      password
        ? field
            .required('Confirme a senha')
            .oneOf([Yup.ref('password')], 'Senhas não são iguais')
        : field
    ),
});

export default function SignIn() {
  const profile = useSelector(state => state.user.profile);
  const { register, setValue, handleSubmit, errors } = useForm({
    defaultValues: profile,
    validationSchema: schema,
  });
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function onSubmit(value) {
    dispatch(updateProfileRequest(value));
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
            onChangeText={text => setValue('name', text)}
          />
          <FormInput
            ref={register({ name: 'email' })}
            autoCorrect={false}
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            defaultValue={profile.email}
            onChangeText={text => setValue('email', text)}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          <Separator />
          <FormInput
            secureTextEntry
            ref={register({ name: 'oldPassword' })}
            autoCorrect={false}
            placeholder="Senha atual"
            returnKeyType="next"
            onChangeText={text => setValue('oldPassword', text)}
          />
          {errors.oldPassword && (
            <ErrorText>{errors.oldPassword.message}</ErrorText>
          )}

          <FormInput
            secureTextEntry
            ref={register({ name: 'password' })}
            autoCorrect={false}
            placeholder="Nova senha"
            returnKeyType="next"
            onChangeText={text => setValue('password', text)}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <FormInput
            secureTextEntry
            ref={register({ name: 'confirmPassword' })}
            autoCorrect={false}
            placeholder="Confirmação de senha"
            returnKeyType="next"
            onChangeText={text => setValue('confirmPassword', text)}
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}

          <SaveButton loading={loading} onPress={handleSubmit(onSubmit)}>
            Salvar perfil
          </SaveButton>
          <ExitButton onPress={() => dispatch(signOut())}>Sair</ExitButton>
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
