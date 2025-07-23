let otp = document.querySelector("#otp");
let qtd = document.querySelector("#qtd");

let aviso = document.getElementById("aviso");

let produtos = JSON.parse(localStorage.getItem("Produtos")) || [];

function refresh() {
  otp.innerHTML = "";

  if (produtos.length > 0) {
    produtos.forEach(
      (produto) =>
        (otp.innerHTML += `<div class="w-full h-[50px] flex items-center justify-center border-b-1 border-black/30 px-10">
      <p class="w-[20%] flex items-center justify-center">${produto.id}</p>
      <p class="w-[20%] flex items-center justify-center text-ellipsis overflow-hidden text-nowrap">${
        produto.nomeProduto
      }</p>
      <p class="w-[20%] flex items-center justify-center">R$${produto.precoProduto.toFixed(
        2
      )}</p>
      <p class="w-[20%] flex items-center justify-center">${
        produto.estoqueProduto
      }</p>
      <div class="flex items-center justify-center gap-1 w-[20%]">
        <button class="btn-acoes bg-blue-500 cursor-pointer hover:bg-blue-400 duration-75" onclick="openCardEdit(${
          produto.id
        })"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn-acoes bg-red-500 cursor-pointer hover:bg-red-400 duration-75" onclick="excluirProduto(${
          produto.id
        })"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`)
    );
  } else {
    otp.innerHTML = `<div class="w-full h-full flex flex-col gap-5 items-center justify-center">
      <h1 class="text-3xl text-white/60 font-bold">Ainda não possui produtos!</h1>
      <a
          href="../Form/form.html"
          class="w-[150px] h-[40px] bg-blue-500 text-white font-bold rounded-md flex items-center justify-center gap-2 hover:bg-blue-400 duration-200"
        >
          <i class="fa-solid fa-plus"></i> Novo Produto
        </a>
    </div>`;
  }

  qtd.innerHTML = produtos.length;

  let valorTotal = produtos.reduce((acc, produto) => {
    return acc + produto.precoProduto;
  }, 0);

  document.querySelector("#valor").innerHTML = `R$ ${valorTotal.toFixed(2)}`;
}

function excluirProduto(idParaExcluir) {
  let indice = produtos.findIndex((produto) => produto.id === idParaExcluir);
  produtos.splice(indice, 1);
  localStorage.setItem("Produtos", JSON.stringify(produtos));
  refresh();

  let sucesso = document.querySelector("#sucesso");
  sucesso.style.display = "flex";

  setTimeout(() => {
    sucesso.style.display = "none";
  }, 1500);
}

function clearLista() {
  localStorage.removeItem("Produtos");
  produtos = [];
  refresh();
}

let edit = document.querySelector("#edit");

function openCardEdit(id) {
  let indexProduto = produtos.findIndex((prd) => prd.id === id);
  edit.classList.remove("hidden");
  edit.classList.add("flex");
  edit.innerHTML = `
  
  <form class="w-[500px] bg-white border-2 border-blue-500 p-5 rounded-xl shadow-md z-50" id="formEdit">
  <div class="my-2 flex flex-col gap-0.5">
  <h1 class="text-2xl">Editar: ${produtos[indexProduto].nomeProduto}</h1>
  <p>ID: ${produtos[indexProduto].id}</p>
  </div>
  
        <label>
          Nome do produto:
          <input type="text" id="editNome" />
        </label>
        <label>
          Preço do produto
          <input type="number" step="0.01" id="editPreco" />
        </label>
        <label>
          Estoque:
          <input type="number" id="editEstoque" />
        </label>

        <div class="w-full h-auto flex gap-2 mt-5 text-white">
          
          <button type="button" onclick="closeCardEdit()" class="bg-red-500 w-[50%] h-[40px] rounded-[5px] cursor-pointer hover:bg-red-800 duration-200">Cancelar</button>
          <button type="button" onclick="editarProduto(${id})" class="bg-blue-500 w-[50%] h-[40px] rounded-[5px] cursor-pointer hover:bg-blue-600 duration-200">
            Editar
          </button>
        </div>
      </form>`;
}

function closeCardEdit() {
  edit.classList.add("hidden");
  edit.classList.remove("flex");
}

function editarProduto(idProduto) {
  let indexProduto = produtos.findIndex((prd) => prd.id === idProduto);
  console.log(produtos[indexProduto].nomeProduto);

  let newNomeProduto = document.getElementById("editNome").value;
  let newPrecoProduto = document.getElementById("editPreco").value;
  let newEstoqueProduto = document.getElementById("editEstoque").value;
  if (
    newNomeProduto !== "" &&
    newPrecoProduto !== "" &&
    newEstoqueProduto !== ""
  ) {
    produtos[indexProduto].nomeProduto = newNomeProduto;
    produtos[indexProduto].precoProduto = newPrecoProduto;
    produtos[indexProduto].estoqueProduto = newEstoqueProduto;
    edit.classList.remove("flex");
    edit.classList.add("hidden");
  } else {
    aviso.innerHTML = `<p>Insira todos os valores!</p>`;
    aviso.style.display = "flex";

    setTimeout(() => {
      aviso.style.display = "none";
    }, 1500);
  }

  localStorage.setItem("Produtos", JSON.stringify(produtos));

  refresh();
}

refresh();
