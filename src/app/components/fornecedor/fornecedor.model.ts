export interface Fornecedor {
    id?: number
    nome: string
    cnpj: string
    telefone: string
    cep:string
    endereco: string
    bairro: string
    municipio: string
    uf: string
    status: boolean
    tipoFornecedor: object
}