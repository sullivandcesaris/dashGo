import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./Notifications";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {

  const {onOpen} = useSidebarDrawer()

  //versão larga
const isWideVersion = useBreakpointValue({
  //por padrão as informações do usuário não ficam visíveis
  base: false,
  //a menos que o breakpoint seja large (que o dispositivo usado seja um computador)
  lg: true,
})

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      marginX="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion &&(
        <IconButton
        aria-label = "Open navigation"
        icon={<Icon as={RiMenuLine}/>}
        variant="unstyled"
        onClick={onOpen}
        mr="2"
        >

        </IconButton>
      )}
      <Logo />
      {/* se estiver na versão estendida, mostrar a serchbox, senão não */}
      {isWideVersion &&(
        <SearchBox/>
      )}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        {/* somente mostrar as informações do perfil quando estiver na versão "larga" */}
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  );
}
