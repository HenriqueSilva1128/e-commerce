import { atualizarPrecoCarrinho } from "./menuCarrinho";
import {
  apagarDoLocalStorage,
  desenharProdutoCarrinhoSimples,
  lerLocalStorage,
  salvarLocalStorage,
} from "./utilidades";

function desenharProdutosCheckout() {
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutoCarrinhoComQuantidade[idProduto]
    );
  }
}


function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutoCarrinhoComQuantidade,
  };
  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const lerHistoricoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
  salvarLocalStorage("historico", lerHistoricoDePedidosAtualizado);
  apagarDoLocalStorage("carrinho");
  window.location.href = "./pedidos.html";
}
atualizarPrecoCarrinho();
desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
