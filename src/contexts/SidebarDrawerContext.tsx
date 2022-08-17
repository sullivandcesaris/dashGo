import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps{
  children: ReactNode
}

//dados que serão gravados dentro do contexto
type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps){
  const disclosure = useDisclosure()
  const router = useRouter()
  
  useEffect(() => {
    //fechar a sidebar
    disclosure.onClose()
  }, 
  //toda vez que o caminho mudar
  [router.asPath])
  
  return(
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)