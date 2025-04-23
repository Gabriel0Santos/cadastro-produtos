// importações
import express from 'express'
import mongoose, { mongo } from 'mongoose'
import { fileURLToPath } from 'url'
import path from 'path'
import { error } from 'console'

// Constantes
const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Conexão ao Banco de Dados
mongoose.connect('mongodb+srv://contareservaid01:RDwlGyUrOegrq1yq@clusterteste01.1qa4ysy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTeste01')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro na conexão com o MongoDB', err));

//modelo Mongoose

const produto = mongoose.model('produto', {

    produto: String,
    preco: Number,
    quantidade: Number

})

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "view")));

//POST
app.post('/cadastro', async (req, res) => {
    try{
        if (!req.body.produto || !req.body.preco || !req.body.quantidade) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
        }

        const ferramenta = new produto({
            produto: req.body.produto,
            preco: req.body.preco,
            quantidade: req.body.quantidade
        })
        await ferramenta.save()
        res.status(201).json({message: 'Produto cadastrado com sucesso'})
    } catch (err) {
        console.error('Erro ao salvar o produto:', err)
        res.status(500).json({message: 'Erro ao salvar produto', error: err})
    }


})

// GET

app.get('/cadastro', (req,res) => {
    res.sendFile(path.join(__dirname, "view", "index.html"))
})

app.get('/produtos', (req,res) => {
    res.sendFile(path.join(__dirname, "view", "listar.html"))
})

app.get('/api/produtos', async (req,res) =>{
    try{
        const produtos = await produto.find()
        res.json(produtos)
    }
    catch(err) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error: err })

    }
})
// Chamada do Servidor

app.listen( PORT, () => {
    console.log(`O Servidor está funcinando bem na porta: localhost:${PORT}.`)
})

