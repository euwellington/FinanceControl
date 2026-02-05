"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useTransaction } from "@/hooks/transaction.hook"
import type { ITransaction } from "@/interfaces/ITransaction"
import { Trash, Loader2 } from "lucide-react"
import { useState } from "react"

interface Props {
    item: ITransaction
}

const RemoveTransaction = ({ item }: Props) => {
    const { remove, loading } = useTransaction()
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        await remove(item, () => setOpen(false));
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="h-9 w-9 p-0 ml-2 shadow-sm"
                >
                    <Trash size={16} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Transação</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deseja realmente excluir a transação <span className="font-bold text-foreground">"{item.description}"</span> no valor de <span className="font-bold text-foreground">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount)}</span>?
                        Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={loading}
                        style={{ borderColor: '#26a0fc', color: '#26a0fc' }}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        asChild
                    >
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            style={{ backgroundColor: '#db3125', color: 'white' }}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md min-w-[80px]"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Excluir"
                            )}
                        </button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveTransaction;