let form = document.querySelector("form");

let produtos = JSON.parse(localStorage.getItem("Produtos")) || [];
let id = produtos.length ? produtos[produtos.length - 1].id + 1 : 0;

function criarProduto() {
  let nomeProduto = document.querySelector("#nomeProduto").value;
  let precoProduto = document.querySelector("#precoProduto").value;
  let estoqueProduto = document.querySelector("#estoqueProduto").value;

  let novoProduto = {
    id: id++,
    nomeProduto,
    precoProduto: parseFloat(precoProduto),
    estoqueProduto,
  };

  produtos.push(novoProduto);

  localStorage.setItem("Produtos", JSON.stringify(produtos));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  criarProduto();
});
