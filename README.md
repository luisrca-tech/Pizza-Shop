# Modulo 3 - Conexão com API

> Configurando API client: [
    Visão Geral
Este repositório contém código para uma aplicação React. Abaixo está um resumo das principais funcionalidades implementadas no código.

Configuração do Axios
O Axios é uma biblioteca utilizada para realizar requisições HTTP. Neste caso, o código cria uma instância do Axios chamada api, a qual será usada para fazer requisições para uma API específica. Essa instância é configurada com uma URL base, a qual é obtida de uma variável de ambiente dentro de (.env.local) chamada VITE_API_URL. Isso significa que todas as requisições feitas com esta instância terão essa URL como base, facilitando o acesso a diferentes endpoints da API. (axios.ts)

Validação de Variáveis de Ambiente
A aplicação faz uso da biblioteca Zod para validar variáveis de ambiente, garantindo que estejam corretamente configuradas antes de serem utilizadas. No caso específico, a variável VITE_API_URL é validada para assegurar que contenha uma URL válida. Isso ajuda a evitar erros decorrentes de configurações incorretas das variáveis de ambiente. (env.ts)

Configuração do React Query
O React Query é uma biblioteca que simplifica o gerenciamento de dados assíncronos em aplicações React. Aqui, uma instância do queryClient é criada e configurada para ser utilizada em toda a aplicação. Essa instância é responsável por gerenciar o carregamento e cacheamento de dados, oferecendo uma camada de abstração que facilita o acesso e atualização dos dados assíncronos. Essa configuração centralizada promove uma maior organização e reutilização do código relacionado ao gerenciamento de estado assíncrono. (reactt-query.ts) - (src/app.tsx)
]

> Autenticação do usuário: [

  ```ts
  export interface SignInBody {
  email: string
}
 ```

  A interface SignInBody é definida para estruturar os dados necessários para o login, garantindo que o e-mail do usuário seja transmitido de maneira adequada durante o processo de autenticação.

  ```ts
  export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email })
}
  ```

  A função signIn é implementada para enviar uma requisição para o endpoint de autenticação da API. Ela utiliza o Axios para realizar a comunicação e transmite o e-mail fornecido pelo usuário como parte dos dados da requisição.

  ```ts
  import { useMutation } from '@tanstack/react-query'
  ```

  O react-query é adotado para gerenciar o estado assíncrono da operação de autenticação. Ele fornece uma solução eficiente para lidar com operações assíncronas na aplicação React, simplificando o gerenciamento de dados e melhorando a experiência do desenvolvedor.

  ```ts
  async function handleSignIn(data: SignInForm) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await authenticate({ email: data.email })
    toast.success('Enviamos um link de autenticação para seu e-mail.', {
      action: {
        // ...
      }
    })
  } catch (error) {
    // Handle error
  }
}
  ```

  A função handleSignIn é implementada para lidar com o envio do formulário de login. Ela aguarda a finalização da operação de autenticação antes de prosseguir, garantindo que o usuário seja notificado adequadamente sobre o progresso da operação.

]

> Cadastro de restaurante: [

  ```ts
  export interface RegisterRestaurantBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}
  ```

  Definição da interface RegisterRestaurantBody para estruturar os dados necessários para o registro do restaurante, como nome do restaurante, nome do gerente, e-mail e telefone.

  ```ts
  export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: RegisterRestaurantBody) {
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
  ```

  Implementação da função registerRestaurant, que utiliza o Axios para enviar uma requisição POST para o endpoint de registro de restaurantes da API, transmitindo os dados fornecidos pelo usuário.

  ```ts
    async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      // Handle error
    }
  }
  ```

  Implementação da função handleSignUp para lidar com o envio do formulário de registro de restaurante, aguardando a finalização da operação de registro antes de prosseguir.

  Introdução de um atraso de 2 segundos durante o processo de registro, simulando um cenário realista e fornecendo feedback visual ao usuário sobre o progresso da operação.

  ```ts
    const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '', // Preencher o campo de e-mail com o valor obtido dos parâmetros de busca da URL
    },
  })
  ```

  Utilização do hook useSearchParams do react-router-dom para obter os parâmetros de busca da URL, como o e-mail pré-preenchido no formulário de login.
]
