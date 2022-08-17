import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRgisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1; //quantidade de páginas ao lado da página principal

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0); //se a página for menor que 1, não vai aparecer
}

export function Pagination({
  totalCountOfRgisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  //Math.floor serve para arrendondar o resultado para um numero inteiro
  const lastPage = Math.floor(totalCountOfRgisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) //para gerar um array em branco que terá o tamanho de siblingsCount
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        ) //para gerar um array em branco que terá o tamanho de siblingsCount
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && 
        <>
        <PaginationItem onPageChange={onPageChange} number={1} />
        {(currentPage > 2 + siblingsCount) && <Text color="gray.300" width="8" align="center">...</Text>}
        </>
        }

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
          })}
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />
        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return <PaginationItem onPageChange={onPageChange} key={page} number={page} />;
          })}

        {(currentPage + siblingsCount) < lastPage && 
        <>
        {(currentPage + 1 + siblingsCount)< lastPage && <Text color="gray.300" width="8" align="center">...</Text>}
        <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </>
        }
      </Stack>
    </Stack>
  );
}
