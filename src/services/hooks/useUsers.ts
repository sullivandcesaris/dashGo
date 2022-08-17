import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { api } from "../api";

//o type é usado para tipar algum dado, neste caso está tipando a variável data,
//que antes estava como any
type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const {data, headers} = await api.get("users", {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(user => {
    return{
      id: user.id,
      name: user.name,
      email: user.email,
      //formatar a data para pt-br
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        //formato do dia de 2 digitos
        day:'2-digit',
        //mes escrito
        month: 'long',
        //ano em numeros
        year: 'numeric'
      })
    }
  });
  return {
    users, 
    totalCount};
}

//hook que retorna a lista de usuários
export function UseUsers(page: number, options: UseQueryOptions){
  return(

  useQuery(['users', page], () => getUsers(page) ,{
    staleTime: 1000*60*10,//durante 5 segundos ela vai ser fresh, não vai precisar ser recarregada
    ...options,
  })
  )

}