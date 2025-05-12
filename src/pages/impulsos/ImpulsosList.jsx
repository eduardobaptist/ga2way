"use client"

import { MainWrapper } from "@/components/MainWrapper"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, PlusCircle, Filter, Loader2, Cog, AlertCircle, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { formatDatetime } from "@/lib/utils"
import api from "@/axios.config"
import { ImpulsosActions } from "./ImpulsosActions"

export const ImpulsosList = () => {
  const [filterType, setFilterType] = useState("descricao")
  const [searchTerm, setSearchTerm] = useState("")
  const [impulsos, setImpulsos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const filters = [
    { value: "descricao", label: "Descrição" },
    { value: "valor", label: "Valor" },
    { value: "dataCriacao", label: "Data de Criação" },
  ]

  const fetchImpulsos = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.get("/impulsos")
      setImpulsos(response.data)
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erro ao carregar impulsos."
      setError(errorMessage)
      toast({
        title: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImpulsos()
  }, [])

  const filteredImpulsos = impulsos.filter((impulso) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    switch (filterType) {
      case "descricao":
        return impulso.descricao.toLowerCase().includes(searchLower)
      case "valor":
        return impulso.valor > Number.parseFloat(searchLower)
      case "dataCriacao":
        return new Date(impulso.createdAt).toLocaleDateString().toLowerCase().includes(searchLower)
      default:
        return true
    }
  })

  return (
    <MainWrapper title="Impulsos acadêmicos">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 rounded-xl mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300 mb-2">Gerenciamento de Impulsos</h2>
        <p className="text-emerald-700 dark:text-emerald-400 text-sm">
          Gerencie os impulsos acadêmicos disponíveis no sistema. Você pode filtrar, buscar e adicionar novos impulsos.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex col-span-2 md:col-span-1">
          <Select defaultValue="nome" onValueChange={(value) => setFilterType(value)}>
            <SelectTrigger className="w-max rounded-r-none border-r-0 bg-white dark:bg-gray-900">
              <SelectValue>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="mr-2">{filters.find((f) => f.value === filterType)?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex relative w-full">
            <div className="w-full flex-grow">
              <Input
                type="text"
                placeholder="Buscar"
                className="rounded-l-none pl-3 border-l-0 focus-visible:ring-emerald-500 focus-visible:ring-offset-emerald-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div className="flex justify-between md:justify-end col-span-2 md:col-span-1 gap-2">
          <Link to="/impulsos/novo">
            <Button
              className="bg-emerald-600 text-white hover:text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              variant="default"
            >
              <PlusCircle className="mr-2" size="20" />
              Novo Impulso
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <div className="rounded-xl overflow-hidden border bg-white dark:bg-gray-900 shadow-md">
          <Table className="min-w-full">
            <TableHeader className="bg-emerald-50 dark:bg-emerald-950/30">
              <TableRow className="hover:bg-transparent border-b border-emerald-100 dark:border-emerald-900">
                <TableHead className="w-[50px] text-emerald-700 dark:text-emerald-300 font-semibold">Ações</TableHead>
                <TableHead className="min-w-[300px] text-emerald-700 dark:text-emerald-300 font-semibold">
                  Descrição
                </TableHead>
                <TableHead className="text-right text-emerald-700 dark:text-emerald-300 font-semibold">Valor</TableHead>
                <TableHead className="whitespace-nowrap text-emerald-700 dark:text-emerald-300 font-semibold">
                  Criação
                </TableHead>
                <TableHead className="whitespace-nowrap text-emerald-700 dark:text-emerald-300 font-semibold">
                  Alteração
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="relative">
                        <Loader2 className="h-10 w-10 animate-spin text-emerald-600 dark:text-emerald-400" />
                        <div className="absolute inset-0 h-10 w-10 animate-pulse rounded-full bg-emerald-100 dark:bg-emerald-900 -z-10"></div>
                      </div>
                      <span className="text-sm text-emerald-700 dark:text-emerald-300 mt-2">
                        Carregando impulsos...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 p-4 rounded-lg">
                      <AlertCircle className="h-6 w-6" />
                      <span className="font-medium">{error}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchImpulsos}
                        className="mt-2 border-rose-300 text-rose-600 hover:bg-rose-100 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/50"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Tentar novamente
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredImpulsos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                        <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 font-medium mt-2">
                        Nenhum impulso acadêmico encontrado
                      </span>
                      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                        Tente ajustar seus filtros ou criar um novo impulso acadêmico.
                      </p>
                      <Button variant="outline" size="sm" onClick={fetchImpulsos} className="mt-2">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Recarregar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredImpulsos.map((impulso) => (
                  <TableRow
                    key={impulso.id}
                    className="group hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors"
                  >
                    <TableCell>
                      <ImpulsosActions impulso={impulso} onRefresh={fetchImpulsos} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 max-w-[400px]">
                        {!impulso.empresa_id && (
                          <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-900">
                            <Cog className="h-3.5 w-3.5 mr-1" />
                            Padrão do sistema
                          </Badge>
                        )}
                        <span className="truncate font-medium">{impulso.descricao}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className="bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md text-emerald-700 dark:text-emerald-300">
                        {Number.parseFloat(impulso.valor).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-emerald-700/70 dark:text-emerald-400/70">
                      {formatDatetime(impulso.createdAt) || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-emerald-700/70 dark:text-emerald-400/70">
                      <div className="flex items-center gap-1">
                        {formatDatetime(impulso.updatedAt) || "-"}
                        {impulso.createdAt !== impulso.updatedAt && (
                          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainWrapper>
  )
}
