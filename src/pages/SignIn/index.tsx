import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { signIn, user } = useAuth();
  console.log(JSON.stringify(user));

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      console.log(data);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        await signIn({ email: data.email, password: data.password });
        // history.push('/dashboard');
      } catch (err) {
        console.log('the fucking error is', err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login');
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
                name="password"
                icon="lock"
                placeholder="Senha"
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="ff9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
