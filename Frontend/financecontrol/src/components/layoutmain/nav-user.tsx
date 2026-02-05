"use client"

import { useContext } from "react"
import { ChevronsUpDown, LogOut, Clock, AlertCircle } from "lucide-react"
import { observer } from "mobx-react-lite"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { StoresContext } from "@/stores/inject"
import { cn } from "@/lib/utils"

const NavUser = observer(() => {
  const { jwtStore } = useContext(StoresContext)
  const { isMobile } = useSidebar()

  if (!jwtStore.decoded) return null

  const userInitial = jwtStore.decoded.Name?.charAt(0).toUpperCase() || "U"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{jwtStore.decoded.Name}</span>
                  <span className="truncate text-[10px] text-muted-foreground">ID: {jwtStore.decoded.Id}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-[10px]">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{jwtStore.decoded.Name}</span>
                    <span className="truncate text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> Token validade: {jwtStore.timeLeft}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 size-4" />
                  Sair da conta
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent
            className={cn(
              "sm:max-w-sm",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
              "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
            )}
          >
            <DialogHeader className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-xl">Encerrar Sessão</DialogTitle>
                <DialogDescription>
                  Deseja realmente sair do sistema? Suas alterações não salvas podem ser perdidas.
                </DialogDescription>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-4 flex sm:justify-center gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Continuar aqui
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={() => 
                {
                  jwtStore.logout();
                  window.location.href = '/';
                }
                }
              >
                Sim, sair agora
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
})

export default NavUser