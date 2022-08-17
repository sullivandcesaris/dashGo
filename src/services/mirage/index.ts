import { createServer, Factory, Model, Response, ActiveModelSerializer} from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer(){
  const server = createServer({

    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      //partial serve para que não seja obrigatório informar todas as coisas contidas na tipagem
      user: Model.extend<Partial<User>>({})
    },

    factories:{
      user: Factory.extend({
        name(i: number){
          //vai retornar o usuário 1, 2, 3
          return `User ${i +1}`
        },
        email(){
          return faker.internet.email().toLowerCase();
        },
        createdAt(){
          return faker.date.recent(10);
        },
      })
    },

    seeds(server){
      server.createList('user', 200)
    },

    routes(){
      this.namespace = 'api'
      this.timing = 750

      //quando chamar a rota users, vai retornar automaticamente a lista completa de usuários
      this.get('/users', function(schema, request){
        const { page = 1, per_page = 10} = request.queryParams 

        //usado para pegar todos os dados de dentro de usuários
        const total = schema.all('user').length

        //em qual registro a página vai iniciar
        //o -1 é para a primeira página não começar em 10, e sim em 0
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page)

        //schema.all('user') retorna um objeto, e dentro desse objeto tem o array de users
        //slice: cortar a listagem de usuários no pageStart e no pageEnd
        const users = this.serialize(schema.all('user')).users
        .sort((a, b) => a.created_at - b.created_at)
        .slice(pageStart, pageEnd)

        return new Response(
          200,//status code, que no caso é 200
          {'x-total-count': String(total)},
          {users}
        )
      })
      this.get('/users/:id')//cria automaticamente uma rota que vai listar os usuários pelo id
      //cria um usuário no banco de dados do mirage
      this.post('/users')

      this.namespace = '';
      this.passthrough()
    }
  })
  return server;
}