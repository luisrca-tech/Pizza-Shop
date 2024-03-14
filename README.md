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

> Perfil no cabeçalho: [

  ```ts
  import { api } from '@/lib/axios'

interface GetManagedRestaurantResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return response.data
}
  ```

Definição da interface GetManagedRestaurantResponse para estruturar os dados retornados pela API, incluindo o ID, nome, data de criação, data de atualização, descrição e ID do gerente do restaurante.
Utilização do Axios para realizar uma requisição GET para o endpoint /managed-restaurant da API.
A função retorna os dados do restaurante gerenciado obtidos da resposta da API.

```ts
  import { api } from '@/lib/axios'

interface GetProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}

```

Definição da interface GetProfileResponse para estruturar os dados retornados pela API, incluindo o ID, nome, e-mail, telefone, papel (gerente ou cliente) e datas de criação e atualização do perfil.
Utilização do Axios para realizar uma requisição GET para o endpoint /me da API.
A função retorna os dados do perfil obtidos da resposta da API.

```ts
  import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'

export function AccountMenu() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  // Implementação do restante do componente...
}
```

Utilização do react-query para buscar os dados do perfil do usuário e do restaurante gerenciado.
O componente utiliza o hook useQuery para realizar as consultas assíncronas aos endpoints /me e /managed-restaurant.
As informações obtidas são exibidas no menu de conta, incluindo o nome do restaurante gerenciado, o nome do usuário e o e-mail.
Ícones são utilizados para indicar ações como expandir o menu e fazer logout.
Este commit representa uma adição valiosa à interface do usuário, proporcionando aos usuários uma maneira fácil de acessar e visualizar informações importantes sobre suas contas.

queryKey: O queryKey é um identificador único para uma consulta realizada com o react-query. Ele é utilizado para identificar e agrupar consultas relacionadas. No exemplo fornecido, ['profile'] e ['managed-restaurant'] são os queryKey usados para identificar as consultas para obter o perfil do usuário e o restaurante gerenciado, respectivamente. Esses valores podem ser arrays de strings, números, objetos ou qualquer outro tipo de dado que sirva como identificador único.

queryFn: O queryFn é uma função que define a operação que será realizada para obter os dados da consulta. Essa função é executada pelo react-query quando necessário para recuperar os dados. No exemplo fornecido, getProfile e getManagedRestaurant são as funções utilizadas como queryFn para realizar as requisições HTTP para obter o perfil do usuário e o restaurante gerenciado, respectivamente. Essas funções retornam uma promessa que resolve com os dados obtidos da resposta da API.

{profile?.email} {managedRestaurant?.name} {profile?.name}: Essas linhas de código estão utilizando a sintaxe opcional de encadeamento (?.) para acessar propriedades de objetos de forma segura. Elas garantem que, caso o objeto seja null ou undefined, a expressão inteira seja avaliada como undefined, evitando erros. No contexto fornecido, essas linhas são usadas para exibir informações do perfil do usuário logado, como seu e-mail, nome e o nome do restaurante que ele gerencia, caso aplicável.

```ts
import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})
```

Habilitação do uso de credenciais na requisição, configurando a opção withCredentials como true. Isso permite que cookies e cabeçalhos de autenticação sejam incluídos automaticamente na requisição, útil para autenticação com o servidor.
]

> Loading State no perfil: [

  ```ts
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
    })

  return (
    <>
      {isLoadingManagedRestaurant ? (
        <Skeleton />
      ) : (
        managedRestaurant?.name
      )}
      {isLoadingProfile ? (
        <div>
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <>
          <span>{profile?.name}</span>
          <span>
            {profile?.email}
          </span>
        </>
      )}
    </>
  )
}
  ```

O uso da componente Skeleton para fornecer feedback visual enquanto os dados estão sendo carregados.
Se isLoadingManagedRestaurant for true, um esqueleto de carregamento é exibido para o nome do restaurante gerenciado.
Se isLoadingProfile for true, esqueletos de carregamento são exibidos para o nome e e-mail do perfil do usuário.

isLoading: A propriedade isLoading é uma variável booleana retornada pelo hook useQuery do react-query. Ela indica se a consulta está atualmente em andamento, ou seja, se os dados estão sendo buscados do servidor. Quando isLoading é true, isso significa que os dados ainda não foram carregados e a consulta está em andamento. Quando isLoading é false, significa que a consulta foi concluída e os dados estão disponíveis para serem usados.

```ts
  import { env } from '@/env'
import { api } from '@/lib/axios'
import { z } from 'zod'

const envSchema = z.object({
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
})

export const env = envSchema.parse(import.meta.env)

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return config
  })
}
```

Utilização da biblioteca zod para definir um esquema de validação para as variáveis de ambiente(.env.local), garantindo que os valores sejam do tipo esperado.(env.ts)
Definição de um esquema envSchema que valida a variável de ambiente VITE_ENABLE_API_DELAY, transformando o valor em um booleano.(env.ts)

Utilização da variável de ambiente VITE_ENABLE_API_DELAY para determinar se o atraso na API deve ser ativado.
Se VITE_ENABLE_API_DELAY for true, um interceptor é adicionado à instância da API Axios, que espera 2 segundos antes de enviar a requisição.
Este atraso é útil durante o desenvolvimento para simular um cenário realista onde o servidor leva algum tempo para responder.

api.interceptors.request.use: Este trecho de código configura um interceptor para requisições feitas pela instância api do Axios. Interceptores são funções que podem ser executadas antes de uma requisição ser enviada ou após uma resposta ser recebida. Neste caso, o interceptor é configurado para executar uma função antes de cada requisição ser feita.

.use(async (config) => { ... }): O método .use() é usado para adicionar uma função de interceptação. Neste caso, a função passada como argumento será executada antes de cada requisição. Ela recebe um objeto config como parâmetro, que representa a configuração da requisição. A função é assíncrona (async), o que permite que ela aguarde a conclusão de uma operação assíncrona, como um atraso, antes de prosseguir.

await new Promise((resolve) => setTimeout(resolve, 2000)): Dentro da função de interceptação, é criada uma nova Promise que resolve após 2 segundos de atraso (setTimeout). Isso simula um atraso na resposta do servidor, útil para testar o comportamento da aplicação em situações de latência ou para simular um servidor que demora para processar as requisições.

return config: Por fim, a função de interceptação retorna a configuração da requisição (config). É importante retornar este objeto para garantir que a requisição continue normalmente após o atraso, preservando todas as configurações definidas anteriormente, como a URL, os cabeçalhos e os parâmetros da requisição.
]

> Modal de atualização do perfil: [

  ```ts
const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const { register, handleSubmit } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  return (
    <form>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="name">
            Nome
          </Label>
          <Input className="col-span-3" id="name" {...register('name')} />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="description">
            Descrição
          </Label>
          <Textarea
            className="col-span-3"
            id="description"
            {...register('description')}
          />
        </div>
      </div>
    </form>
  )
}

```

Utilização da função z.object() para criar um esquema de objeto com as propriedades name e description.
Para o campo name, é definido que deve ser uma string com no mínimo 1 caractere.
Para o campo description, é especificado que deve ser uma string.
Utilização do tipo StoreProfileSchema para inferir o tipo dos dados que obedecem ao esquema definido.
No componente StoreProfileDialog, é feita uma consulta para obter os dados do restaurante gerenciado.
O hook useForm do react-hook-form é utilizado para gerenciar o formulário, passando o esquema de validação definido.
Os valores iniciais do formulário são definidos com base nos dados do restaurante gerenciado, se disponíveis.
Este trecho de código garante que o formulário para armazenar o perfil do restaurante seja validado de acordo com as regras especificadas antes de ser submetido.

z.infer `typeof storeProfileSchema`: O z.infer é um recurso do Zod que infere o tipo de dados com base no esquema de validação definido. Neste caso, storeProfileSchema é o esquema de validação definido usando a biblioteca Zod. Ao usar z.infer, o TypeScript pode inferir o tipo dos dados que respeitam o esquema especificado, permitindo uma forte tipagem e validação de dados.

zodResolver(storeProfileSchema): O zodResolver é uma função fornecida pelo pacote @hookform/resolvers/zod, que cria um resolvedor de esquema para o react-hook-form com base no esquema de validação do Zod. Isso permite que o react-hook-form valide os campos do formulário de acordo com as regras especificadas no esquema do Zod. O resolvedor criado por zodResolver será usado como o resolver no useForm do react-hook-form, garantindo que o formulário seja validado de acordo com as regras definidas no esquema do Zod.

register: O register é uma função fornecida pelo react-hook-form que é usada para registrar os campos do formulário. Ele é usado para vincular campos de entrada (< input >, < select >, < textarea >, etc.) a uma instância do react-hook-form, permitindo que ele controle o estado e a validação desses campos. O register é chamado passando o nome do campo como argumento e retorna um objeto contendo as props que devem ser espalhadas no elemento de entrada. Isso permite que o react-hook-form monitore e valide o campo adequadamente.

handleSubmit: O handleSubmit é uma função fornecida pelo react-hook-form que é usada para lidar com a submissão do formulário. Ela é chamada no evento de submissão do formulário (por exemplo, no evento onSubmit do < form >). Quando chamada, handleSubmit executa a validação do formulário e, se o formulário for válido, chama a função de callback passada como argumento. A função de callback geralmente contém a lógica para enviar os dados do formulário para o servidor. Se houver erros de validação, handleSubmit impede a submissão do formulário e exibe os erros correspondentes nos campos.

Bom lembrar que `value` e não `DefaultValue` para o useForm nesses casos de put... pois, esse valor precisa chegar da api, se definirmos default, ele vai preencher com '', pois os dados ainda não chegaram...

]

> Atualizando perfil: [

```ts
  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente')
    }
  }    
```

async function handleUpdateProfile(data: StoreProfileSchema) { ... }: Esta é uma função assíncrona que lida com a atualização do perfil do usuário. Ela recebe os dados do perfil como argumento e, dentro do bloco try, chama a função updateProfileFn que faz uma mutação assincrona, dando um put na nossa api, para atualizar o perfil no servidor. Se a atualização for bem-sucedida, uma mensagem de sucesso é exibida usando o componente toast.success. Se ocorrer algum erro durante a atualização, uma mensagem de erro é exibida usando o componente toast.error. Esta função é normalmente chamada em resposta à submissão de um formulário de atualização de perfil.

```ts
  import { api } from '@/lib/axios'

interface UpdateProfileBody {
  name: string
  description: string | null
}
```

A função updateProfile é responsável por enviar uma requisição PUT para o endpoint /profile da API, atualizando o perfil do usuário com os dados fornecidos.

```ts
  const {formState: { isSubmitting }} = useForm({})
```

formState: formState é um objeto fornecido pelo react-hook-form que contém o estado do formulário. Ele fornece várias propriedades úteis para acessar o estado do formulário, como isSubmitting, isValid, isDirty, entre outras.

formState: { isSubmitting }: Neste trecho de código, formState: { isSubmitting } desestrutura o objeto formState para acessar apenas a propriedade isSubmitting. Esta propriedade indica se o formulário está atualmente em processo de submissão. Quando isSubmitting é true, significa que o formulário está sendo submetido, ou seja, os dados do formulário estão sendo enviados para o servidor. Isso é útil para desabilitar os campos do formulário ou exibir um indicador de carregamento enquanto a submissão está em andamento, impedindo que o usuário interaja com o formulário durante esse período.

```ts
  const {data: managedRestaurant} = useQuery({
    slateTime: Infinity
  })
```

staleTime: O parâmetro staleTime é usado no useQuery para definir por quanto tempo os dados podem ser considerados "antigos" antes de serem recarregados da fonte de dados. Se os dados estiverem em cache e o tempo decorrido desde a última busca for inferior ao valor definido em staleTime, o useQuery retornará os dados em cache, sem fazer uma nova busca na fonte de dados.
Quando staleTime é definido como infinity, significa que os dados nunca serão considerados "antigos". Isso faz com que o useQuery sempre retorne os dados em cache, mesmo que tenha havido uma busca recente. Essa configuração é útil quando se deseja manter os dados na UI sempre atualizados, sem recarregar da fonte de dados, independentemente do tempo decorrido desde a última busca.
]

> Atualizando HTTP state: [
  Tipos de local States:
Local state(useState): são estados dos componentes.
Global State(zustand, Redux, Jotai): são estados acessados por varios componentes.
HTTP State: Dados retornados das requisições HTTP, dados da interface.

```ts
   onSuccess(_, { description, name }) {
      const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
        'managed-restaurant',
      ])

      if (cached) {
        queryClient.setQueryData<GetManagedRestaurantResponse>(
          ['managed-restaurant'],
          {
            ...cached,
            name,
            description,
          },
        )
      }
    },
```

onSuccess(_, { description, name }) { ... }: Esta é uma função callback que é executada quando a operação da query é bem sucedida. Ela recebe dois parâmetros:_, que representa os dados retornados pela query (não sendo usados neste caso), e um objeto contendo description e name, que são os novos valores para atualizar os dados da query.

const cached = queryClient.getQueryData< GetManagedRestaurantResponse >(['managed-restaurant']): Esta linha obtém os dados da query denominada 'managed-restaurant' do cache do queryClient. O tipo  < GetManagedRestaurantResponse > especifica o tipo esperado dos dados retornados.

if (cached) { ... }: Este bloco verifica se existem dados em cache para a query 'managed-restaurant'. Se existirem, o bloco de código dentro do if é executado.

queryClient.setQueryData< GetManagedRestaurantResponse >(['managed-restaurant'], { ... }): Esta linha atualiza os dados da query 'managed-restaurant' no cache do queryClient. Os novos dados consistem em uma cópia dos dados existentes (...cached) com os valores de name e description atualizados.

(['const queryClient = useQueryClient()']): utiliza o hook useQueryClient para obter uma instância do queryClient, que é uma interface para interagir com o cache e as consultas do React Query. Essencialmente, queryClient fornece métodos para acessar e manipular os dados em cache, como obter dados de uma consulta, definir dados de consulta, limpar o cache, e muito mais. O queryClient é uma parte fundamental da biblioteca React Query, permitindo que os desenvolvedores gerenciem o estado dos dados de forma eficaz e simplificada em aplicativos React.
]
