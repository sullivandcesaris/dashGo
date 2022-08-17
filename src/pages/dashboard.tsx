import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";


const Chart = dynamic(() => import('react-apexcharts'), {
  ssr:false,
})

//aqui vão as opções de estilização do gráfico
const options ={
  chart: {
    //barra de ferramentas
    toolbar:{
      show:false,
    },
    //zoom que vem por padrão nos gráficos
    zoom:{
      enabled:false
    },
    //cor dos numeros do gráfico, o theme foi importado do chakra, sendo possivel usar
    //as mesmas cores já predefinidas
    foreColor: theme.colors.gray[500]
  },
  //tirar o grid do fundo
  grid:{
    show:false
  },
  //remover as labal dos números que ficavam dentro dos gráficos
  dataLabels:{
    enabled:false
  },
  //curvas do gráfico, por padrão já vem como smooth, deixei como exemplo
  stroke:{
    curve: 'smooth'
  },
  tooltip:{
    enabled:false
  },
  xaxis:{
    type:'datetime',
    //borda de baixo do gráfico (eixo X)
    axisBorder:{
      color: theme.colors.gray[600]
    },
    //tracinhos verticais de baixo do gráfico
    axisTicks:{
      color: theme.colors.gray[600]
    },
    //datas que serão mostradas no rodapé do gráfico
    categories:[
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
  },
  fill:{
    opacity:0.3,
    type: 'gradient',
    gradient:{
      shade: 'dark',
      opacituFrom:0.7,
      opacityTo:0.3
    }
  }
};

const series = [
  {name: 'series1', data:[31, 120, 10, 28, 61, 18, 109]}
];

export default function DashBoard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        {/* minChildWidth: quebra automaticamente o grid para a outra linha caso fique menor que 320px */}
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" >
          <Box
          p={["6", "8"]}
          bg="gray.800"
          borderRadius={8}
          pd="4"
          >
            <Text fontSize="large" mb="4">
              Inscritos da semana
            </Text>
            <Chart height={160} options={options} series={series} type="area" />
          </Box>
          <Box
          p="8"
          bg="gray.800"
          borderRadius={8}
          >
            <Text fontSize="large" mb="4">
              Taxa de abertura
            </Text>
            <Chart height={160} options={options} series={series} type="area" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
