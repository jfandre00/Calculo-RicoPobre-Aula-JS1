let divHistorico = document.getElementById("div-historico");
divHistorico.style.display = "none";

function calcularValorAdicional(aIdade) {
  const SALARIO_ATE_20 = 1000
  const SALARIO_ACIMA_20 = 2000
  const IDADE_LIMITE = 20

  return aIdade <= IDADE_LIMITE ? SALARIO_ATE_20 : SALARIO_ACIMA_20
}

function calcularSalarioLiquido(aIdade, oSalarioBase, aGratificacao, oBonus, oDesconto, oValorTipo, oValorExperiencia, oSigno, oTimeFutebol){
  let adicional = calcularValorAdicional(aIdade)

  let valorPorSigno = calcularSalarioSigno(oSigno)

  let valorPorTimeFutebol = calcularSalarioTimeFutebol(oTimeFutebol)
  
  return ((oSalarioBase + aGratificacao + oBonus + adicional + oValorTipo + valorPorSigno + valorPorTimeFutebol) * oValorExperiencia) - oDesconto
}

function calcularIdade(oAnoNascimento) {
  const hoje = new Date()
  const anoAtual = hoje.getFullYear()
  
  return anoAtual - oAnoNascimento
}

function criarItemHistorico(aMensagem){
  let historico = document.getElementById("ul-historico")
  let listItem = document.createElement("li")
  listItem.textContent = aMensagem
  historico.appendChild(listItem)
}

function obterStatus(oSalarioLiquido, aIdade, oValorExperienca){

  const MINIMO_SALARIO_RICO = 5000
  const MINIMA_IDADE_RICO = 50
  const MINIMA_EXPERIENCIA_RICO = 1.4

  let statusSalarioLiquido = oSalarioLiquido > MINIMO_SALARIO_RICO
  let statusIdade = aIdade > MINIMA_IDADE_RICO
  let statusValorExperiencia = oValorExperienca == MINIMA_EXPERIENCIA_RICO
  
  if(statusSalarioLiquido && statusIdade && statusValorExperiencia){
      return "rico"
  }
  
  return "pobre"
}

function calcularSalarioSigno(meuSigno){
  return meuSigno * 2
} 

function calcularSalarioTimeFutebol(meuTimeFutebol){
  return meuTimeFutebol * 10
}

  

function imprimir() {

  //input
  const anoNascimento = parseInt(document.getElementById("anoNascimento").value)
  const nome = document.getElementById("nome").value
  const salarioBase = parseFloat(document.getElementById("salarioBase").value)
  const gratificacao = parseFloat(document.getElementById("gratificacao").value)
  const bonus = parseFloat(document.getElementById("bonus").value)
  const desconto = parseFloat(document.getElementById("desconto").value)
  const valorTipo = parseFloat(document.getElementById("tipo").value)
  const valorExperienca = parseFloat(document.getElementById("experiencia").value)
  const email = document.getElementById("email").value
  const signo = parseFloat(document.getElementById("signo").value)
  const timeFutebol = parseFloat(document.getElementById("timefutebol").value)

  //processamento
  const idade = calcularIdade(anoNascimento)
  let salarioLiquido = calcularSalarioLiquido(idade, salarioBase, gratificacao, bonus, desconto, valorTipo, valorExperienca, signo, timeFutebol)

  let status = obterStatus(salarioLiquido, idade, valorExperienca)

  //output
  let mensagem = "Sou " + nome + ", meu e-mail é " + email + ", tenho " + idade + " anos e ganho R$" + salarioLiquido + " e sou " + status

  criarItemHistorico(mensagem)
  
  divHistorico.style.display = "block";

}
