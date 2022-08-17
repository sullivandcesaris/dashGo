import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
    //quando o usuário estiver em um dispositivo mobile o tamanho da
    //fonte será de 2xl, no tablet será de 3xl e no pc de 4xl
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      Dashgo
      <Text as="span" color="pink.500" marginLeft="1">
        .
      </Text>
    </Text>
  );
}
