

document.addEventListener('DOMContentLoaded', () => {
document.querySelector('.btn__salvar').addEventListener('click', async () => {
    const produtoNome = document.querySelector('.produto__nome').value
    const produtoPreco = parseFloat(document.querySelector('.produto__preco').value)
    const produtoQuantidade = parseInt(document.querySelector('.produto__quantidade').value)

    if (!produtoNome || isNaN(produtoPreco) || isNaN(produtoQuantidade) || produtoPreco <= 0 || produtoQuantidade <= 0 ) {
        alert('Por favor, preencha todos os campos corretamente.')
        return
    }

    const response = await fetch ('/cadastro', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            produto: produtoNome,
            preco: produtoPreco,
            quantidade: produtoQuantidade
        })

    })

    if (response.ok) {
        alert('Produto salvo com sucesso!')
    }
    else {
        alert('Erro ao salvar o produto.')
    }
})

document.querySelector('btn__consulta').addEventListener('click', async () => {
    
})
})