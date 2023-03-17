import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";


export function SidebarNav() {
  return (
    <Stack spacing="6" align="flex-start">

      <NavSection title="Clientes">
        <NavLink icon={RiDashboardLine} href="/clients/create">Formulário</NavLink>
        <NavLink icon={RiContactsLine} href="/clients">Lista</NavLink>
      </NavSection>

      <NavSection title="Produtos">
        <NavLink icon={RiDashboardLine} href="/products/create">Formulário</NavLink>
        <NavLink icon={RiGitMergeLine} href="/products">Lista</NavLink>
      </NavSection>

      <NavSection title="Pedidos">
        <NavLink icon={RiDashboardLine} href="/orders/create">Formulário</NavLink>
        <NavLink icon={RiGitMergeLine} href="/orders">Lista</NavLink>
      </NavSection>

    </Stack>
  )
}
