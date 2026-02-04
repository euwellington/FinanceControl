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
import { usePeople } from "@/hooks/people.hook"
import type { IPeople } from "@/interfaces/IPeople"
import { Trash, Loader2 } from "lucide-react"
import { useState } from "react"

interface Props {
    item: IPeople
}

const Remove = ({ item }: Props) => {
    const { remove, loading } = usePeople()
    const [open, setOpen] = useState(false)

    const handleSubmit = async () => {
        await remove(item , () => setOpen(false));
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    className="h-10 w-10 px-2 text-sm ml-2"
                    style={{ backgroundColor: '#db3125', color: 'white' }}
                >
                    <Trash size={16} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirma a exclusão da pessoa?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação excluirá permanentemente os dados identificado por {item.id}, cujo nome é {item.name}. Deseja continuar?
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

export default Remove;