const texto = document.querySelector('.resultado h3');
const inputData = document.querySelector('#inputData');
let diasEscalaTrabalhando = document.querySelector('#diasTrabalhando');
let diasEscalaDeFolga = document.querySelector('#diasDeFolgas');
const dataBase = document.querySelector('#dataBase');
let diaTrabalhoBase;
let diasTotalEscala;
const hoje = new Date();
const mes = hoje.getMonth()+1;
const ano = hoje.getFullYear();
const umDiaEmMS = 86400000;
let ndata;
let diasDeFolga = [];
let lista = document.querySelector(".lista");

diasEscalaTrabalhando.addEventListener("change",e =>{
  diasEscalaTrabalhando = Number(e.target.value)
  apagar()
  inputData.value = ""
})

diasEscalaDeFolga.addEventListener("change",e =>{

  diasEscalaDeFolga = Number(e.target.value);
  inputData.value = ""
  apagar()

})

dataBase.addEventListener("change",e =>{
  let diaBase = e.target.value;
  let diaBaseR = new Date(diaBase).getDate();
  let mesBaseR = new Date(diaBase).getMonth()+1;
  let anoBaseR = new Date(diaBase).getFullYear();
  diaTrabalhoBase = new Date(`${mesBaseR}/${diaBaseR}/${anoBaseR}`);
  inputData.value = "";
  apagar()
  return diaTrabalhoBase;

})

function minhaFolga(e){
   apagar();
   diasDeFolga = [];

  if(inputData.value == "") return;
  if(typeof(diasEscalaTrabalhando) != 'number' || typeof(diasEscalaDeFolga) != 'number'){
    alert('Preencha a Escala')
     inputData.value = "";return}
  if (dataBase.value == "") {
    alert('Escolha a data base');
    apagar();
    inputData.value = ""; return}
  if (inputData.value < dataBase.value){
    alert('A data base precisa ser menor que a data pesquisada');
    inputData.value = "";
    return}  

  diasTotalEscala = diasEscalaTrabalhando + diasEscalaDeFolga

  const dataSelecionada = e.target.value;
selectDate = new Date(dataSelecionada)

diaTrabalhoBaseAdd = newDataBase(diaTrabalhoBase,selectDate)

diasDeFolga = setDiaInicialCalendario(diasDeFolga)

  let diferencaDatas = Math.floor((selectDate - diaTrabalhoBase) / umDiaEmMS) + 1

resultadoNoDisplay(selectDate,diferencaDatas);
escreverNaLista(diasDeFolga);

}

const newDataBase = (diaTrabalhoBase,selectDate) =>{

  let diaTrabalhoBaseAdd = new Date(diaTrabalhoBase);
  diaTrabalhoBaseAdd.setDate(diaTrabalhoBase.getDate()+diasEscalaTrabalhando + 1)
  
    while (diaTrabalhoBaseAdd <= selectDate){ 

      diasDeFolga.push(diaTrabalhoBaseAdd.toString());    
      diaTrabalhoBaseAdd.setDate(diaTrabalhoBaseAdd.getDate()+diasTotalEscala)
    }
    return diaTrabalhoBaseAdd;
}

const escreverNaLista = (diasDeFolga)=> {

  let dados = document.createElement('li') // cria elemento li
  
  diasDeFolga.forEach(dias => {
    lista = document.querySelector('.lista').appendChild(dados)
      for (let index = 0; index < diasEscalaDeFolga; index++) {

        lista.innerHTML += `| ${(converterDatas(dias, index))} `
      } 
    })
}

const resultadoNoDisplay = (dataSelecionada,diferencaDatas)=> {
  

    if(diferencaDatas % diasTotalEscala > 0 && diferencaDatas % diasTotalEscala <= diasEscalaTrabalhando){
    texto.innerHTML = (`Voc?? TRABALHAR?? no dia ${ converterDatas(dataSelecionada) }`)} 
    
    else{
    texto.innerHTML += (`Voc?? FOLGAR?? no dia ${converterDatas(dataSelecionada)}`)} 
}


function setDiaInicialCalendario(folgas){
  let ultimoDiaTrabalho = new Date()
  ultimoDiaTrabalho.setDate(hoje.getDate()-3)
  
  let folgasAtual = folgas.filter(ret => {
    ret = setarData(ret)
   return ret > ultimoDiaTrabalho;
  })

   return folgasAtual; 
}

function apagar(){
    lista.innerHTML = ""
    texto.innerHTML = ""
}

function zeroNaFrente(data){
  return data <10 ? `0${data}`: `${data}` 
}

function setarData(d,i=0){
  let data = new Date(d)
  ndata = new Date(data)
 ndata.setDate(data.getDate() + i)
 return ndata;
}

function converterDatas(d,i=1){    
  setarData(d,i); 
  let dia = ndata.getDate();
  let mes = ndata.getMonth() + 1;
  let ano = ndata.getFullYear();

  return `${zeroNaFrente(dia)}/${zeroNaFrente(mes)}/${ano}`
}
