import Link, { LinkProps} from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children:ReactElement //precisa ser um elemento react
  shouldMatchExactHref?: boolean
}

export function ActiveLink({children,shouldMatchExactHref = false, ...rest}: ActiveLinkProps){
  const {asPath} = useRouter()
  let isActive = false;

  if(shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)){
    isActive = true
  }

  //usado para se caso entrar em algum link interno de alguma página (por exemplo criação de
  //usuário), o mesmo vai continuar ativo o link no manu lateral
  if(!shouldMatchExactHref && (asPath.startsWith(String( rest.href )) || 
  asPath.startsWith(String( rest.as)))){
    isActive = true
  }

  return(
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}