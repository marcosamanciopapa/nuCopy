export default function validCpf(){

    // VARIÁVEIS
    const cpf = document.querySelector('#cpf');
    const label = document.querySelector(".cpf_label");
    const btnCostumer = document.querySelector("[data-beaCostumer]");
    const errorText = document.querySelector('[data-errorText]');
    const doc = document.documentElement;
    let contGenerateError = 0;


    // CONFIGURAÇÕES INICIAIS
    cpf.value = "";
    btnCostumer.setAttribute('disabled', 'true');


    // ADICIONA A LABEL EM CIMA DO CAMPO CPF
    function addLabel(){
        cpf.removeAttribute("placeholder");
        label.classList.remove('hidden');
    }


    // REMOVE A LABEL DE CIMA DO CAMPO CPF
    function removeLabel(){
        label.classList.add('hidden');
    }


    // VERIFICA SE O CPF DIGITADO É UM CPF VÁLIDO
    function checkCPF(){
        let total = 0;
        let n = 10;
        let z = 11;
        let firstResult;
        let secondResult;
        let thirdResult = true;
        let checkCPFVector = Array.from(addCPFDigit());

        // Verificar o primeiro digito depois do traço
        for(let i =0; i <9; i++){
            total += checkCPFVector[i]*n;
            n--;
        }
        firstResult = (total*10)%11;
        if(firstResult === 10){
            firstResult = 0;
        }

 
        // Verificar o segundo digito depois do traço
        total=0;
        for(let i =0; i <10; i++){
            total += checkCPFVector[i]*z;
            z--;
        }
        secondResult = (total*10)%11;
        if(secondResult === 10){
            secondResult =0;
        }


        // vefificar se todos os digitos são iguais
        if(checkCPFVector.reduce((total,num)=>{
            return total + num;
        }) === checkCPFVector[0] * 11){
            thirdResult = false;
        }

        if(firstResult === checkCPFVector[9] && secondResult === checkCPFVector[10] && thirdResult === true){
            return true;
        }else{
            return false;
        }

    }


    // ADICIONA AUTOMATICAMENTE PONTOS E TRAÇO AO CAMPO CPF
    function maskCPF(){
        if(cpf.value.length === 3  || cpf.value.length === 7){
            cpf.value = cpf.value.concat(".");
        }else if(cpf.value.length === 11){
            cpf.value = cpf.value.concat("-");
        }
    }


    // TRANSFORMA O VALOR DIGITADO NO CAMPO CPF EM NUMBER E ENVIA PARA A FUNÇÃO CHECKCPF
    function addCPFDigit(){
        let cpfVector = cpf.value.split("").filter((digit)=>{
            return digit.search(/\d/) !== -1
        })
        let newCPFVector = [];
        cpfVector.forEach((item)=>{
            newCPFVector.push(+item);
        });
        //checkCPF(...newCPFVector);
        return newCPFVector;
    }

    // GERA UM ERRO AO CLICAR FORA DO CAMPO CPF QUANDO ERRADO OU INCOMPLETO
    function generateError(){
        btnCostumer.setAttribute('disabled', 'true');
        errorText.classList.remove('none');
        cpf.classList.add('danger');
    }

    function noDelete(e){
        if(e.key === "Backspace"  || e.key === "Delete"){
            cpf.removeEventListener('keydown',noDelete);
            cpf.value ="";
            generateError();
        }
        
    }


    // NO MOMENTO DA DIGITAÇÃO IMPEDE QUE LETRAS SEJAM ADICIONADAS
    function checkChar(){
        const behaviorReg = /\D/;
        let newValue;
        let cpfCuted;
        if(cpf.value.length < 4){
            newValue="";
            if(cpf.value.search(behaviorReg) !== -1){
                newValue = cpf.value.slice(0, cpf.value.length-1);
                cpf.value = newValue;
            }
        }else if(cpf.value.length < 8 && cpf.value.length > 3){
            cpfCuted = cpf.value.slice(4,cpf.value.lenght);
            if(cpfCuted.search(behaviorReg) !== -1){
                cpf.value = cpf.value.slice(0,4).concat(cpfCuted.slice(0,cpfCuted.length-1));
            }
        }else if(cpf.value.length > 8 && cpf.value.length < 12){
            cpfCuted= cpf.value.slice(8,cpf.value.lenght);
            if(cpfCuted.search(behaviorReg) !== -1){
                cpf.value = cpf.value.slice(0,8).concat(cpfCuted.slice(0,cpfCuted.length-1));
            }
        }else if(cpf.value.length >11 && cpf.value.length <= 14){
            cpfCuted= cpf.value.slice(12,cpf.value.lenght);
            if(cpfCuted.search(behaviorReg) !== -1){
                cpf.value = cpf.value.slice(0,12).concat(cpfCuted.slice(0,cpfCuted.length-1));
            }
        }
        
        if(cpf.value.length === 14 && checkCPF() === true){
            btnCostumer.removeAttribute('disabled');
            if(!errorText.classList.contains('none')){
                errorText.classList.add('none');
            }
            cpf.addEventListener('keydown',noDelete);
            doc.removeEventListener('click',generateError);
            contGenerateError = 0;
            cpf.classList.remove('danger');
            cpf.classList.add('sucess');
        }else if(cpf.value.length === 14 && !checkCPF() === true){
            generateError();
        }else{
            if(contGenerateError === 0){
                doc.addEventListener('click', generateError);
                contGenerateError = 1;
            }
        }
    }


    // FUNÇÃO INICIAL PARA CHAMAR AS OUTRAS
    function handleCPF(e) {
        checkChar();
        maskCPF();
    }   

    cpf.addEventListener('input', handleCPF);
    cpf.addEventListener('focus', addLabel);
}