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
import { useCategory } from "@/hooks/category.hook"
import type { ICategory } from "@/interfaces/ICategory"
import { Trash, Loader2 } from "lucide-react"
import { useState } from "react"

interface Props {
    item: ICategory
}

const RemoveCategory = ({ item }: Props) => {
    const { remove, loading } = useCategory()
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
                    <AlertDialogTitle>Excluir Categoria</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você está prestes a excluir a categoria <span className="font-bold text-foreground">"{item.description}"</span>.
                        Esta ação não pode ser desfeita. Deseja continuar?
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
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md"
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

export default RemoveCategory;