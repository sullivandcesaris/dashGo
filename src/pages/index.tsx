import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required("Senha obrigatória")
})

export default function SigIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });
  const { errors } = formState;

  console.log(errors)

  const handleSigIn: SubmitHandler<SignInFormData> = async (values) => {
    //usado para aguardar 2 segundos antes de prosseguir
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8" //equivale a 2rem
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSigIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            id="email"
            label="E-mail"
            error= {errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            id="password"
            label="Password"
            error= {errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          //usado para mostrar a rodinha de carregando enquanto salva as informações
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}