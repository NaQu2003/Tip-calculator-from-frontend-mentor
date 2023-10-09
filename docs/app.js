
const sumInput = document.querySelector('#sum-input')
const peopleInput = document.querySelector('#people-input')
const customInput = document.querySelector('#TipPercentInput')
const radioButtons = Array.from(document.getElementsByName('tipPercent')).splice(0,5) //Seperating custom input form radioButtons ;)
const resetButton = document.querySelector('.submit')
const errors = document.querySelectorAll('.error-js')
const radioLabels = document.querySelectorAll('.radio-label')
const form = document.querySelector('#form')
const tipTotalP = document.querySelector('.tipTotal-amount-js')
const totalP = document.querySelector('.total-per-person-js')
let tipPercent = 0;
function checkErrors(){
    let chosen = false;
    const regx = /^[0-9]{1,9}([,.][0-9]{1,2})?$/
if(sumInput.value ===""){
    errors[0].classList.remove('hidden')
    errors[0].textContent ="Can't be blank"
}else if(!regx.test(sumInput.value)){
    errors[0].classList.remove('hidden')
    errors[0].textContent ="Error: Write normal number"
}
else if(sumInput.value !==""){
    errors[0].classList.add('hidden')
}
    for(let i =0;i<radioButtons.length;i++){
      
        if(radioButtons[i].checked || customInput.value !==""){
                chosen = true;
                if(!errors[1].classList.contains('hidden')){
                    errors[1].classList.add('hidden')
                   
                }
        }else if(!radioButtons[i].checked && customInput.value ===""){
                if(!chosen){
                    errors[1].textContent ="Error:Nothing selected"
                    errors[1].classList.remove('hidden')
                
                }
           
         
        }
    }
    if(peopleInput.value ===""){
    errors[2].classList.remove('hidden');
    errors[2].textContent ="Can't be blank"
    }else if(peopleInput.value ==='0'){
        errors[2].classList.remove('hidden');
        errors[2].textContent ="Are you ghost?"
    }else if(peopleInput.value !==""){
        errors[2].classList.add('hidden');
    }


}   
function setTip(){
    if(radioButtons[0].checked===true){
        tipPercent = 0.05;
        radioLabels[0].classList.add('button-focus')
        for(let i =1;i<radioButtons.length;i++){
            if(radioLabels[i].classList.contains('button-focus')){
                radioLabels[i].classList.remove('button-focus')
                
            }
        }
    }else if(radioButtons[1].checked===true){
        tipPercent = 0.10;
        radioLabels[1].classList.add('button-focus')
        for(let i =0;i<radioButtons.length;i++){
            if(i ===1) continue;
            if(radioLabels[i].classList.contains('button-focus')){
                radioLabels[i].classList.remove('button-focus')
               
            }
        }
    }else if(radioButtons[2].checked===true){
        tipPercent = 0.15;
        radioLabels[2].classList.add('button-focus')
        for(let i =0;i<radioButtons.length;i++){
            if(i ===2) continue;
            if(radioLabels[i].classList.contains('button-focus')){
                radioLabels[i].classList.remove('button-focus')
              
            }
        }
   
    }else if(radioButtons[3].checked===true){
        tipPercent = 0.25;
        radioLabels[3].classList.add('button-focus')
        for(let i =0;i<radioButtons.length;i++){
            if(i ===3) continue;
            if(radioLabels[i].classList.contains('button-focus')){
                radioLabels[i].classList.remove('button-focus')
              
            }
        }
  
    }else if(radioButtons[4].checked===true){
        tipPercent = 0.50;
        radioLabels[4].classList.add('button-focus')
        for(let i =0;i<radioButtons.length;i++){
            if(i ===4) continue;
            if(radioLabels[i].classList.contains('button-focus')){
                radioLabels[i].classList.remove('button-focus')
                
            }
        }
    }
    for(let i =0;i<radioButtons.length;i++){
        if(customInput.value !==""){
            for(let i =0;i<radioButtons.length;i++){
                if(radioLabels[i].classList.contains('button-focus')){
                    radioLabels[i].classList.remove('button-focus')
                }
            }
            tipPercent = customInput.value/100;
        }
    }
}
function calc(){
    checkErrors();
 

    if(errors[0].classList.contains('hidden')
     && errors[1].classList.contains('hidden')
     && errors[2].classList.contains('hidden')){
        setTip();
        let totalPerPerson = 0;
        let tipTotal = 0;
        const sumInputValue = Number(sumInput.value)
        const numberofPeople = peopleInput.value
        tipTotal = Math.round((sumInputValue * 100 *tipPercent))/100
        const TipPerPerson = Math.floor((tipTotal * 100)/numberofPeople)/ 100
        const totalSumPerPerson = Math.floor(((tipTotal * 100) + sumInputValue*100)/numberofPeople)/100 
        
        const formattedTipString = String(TipPerPerson)
        const formattedTotalString = String(totalSumPerPerson) 
        
        displayFormatedTip()
        displayFormatedTotal();
     
        function displayFormatedTip(){
            let reversedString =  formattedTipString.split('').reverse().join('')
            let numberAfterDots = 0;
            let dotExists = false;
            for(let i =0;i<formattedTipString.length;i++){
               
                if(reversedString.charAt(i)==='.'){
                    dotExists = true;
                    if(i ===1){
                        numberAfterDots = 2;
                        break;
                    }
                    
                }    
                } if(dotExists && numberAfterDots ===2){
                    tipTotalP.textContent = `$${TipPerPerson}0`
                }else{
                    tipTotalP.textContent = `$${TipPerPerson}`
                }    
            }
            function displayFormatedTotal(){
                let reversedString =  formattedTotalString.split('').reverse().join('')
                let numberAfterDots = 0;
                let dotExists = false;
                for(let i =0;i<formattedTotalString.length;i++){
                   
                    if(reversedString.charAt(i)==='.'){
                        dotExists = true;
                        if(i ===1){
                            numberAfterDots = 2;
                            break;
                        }
                        
                    }    
                    } 
                    if(dotExists && numberAfterDots ===2){
                        totalP.textContent = `$${totalSumPerPerson}0`
                    }else{
                        totalP.textContent = `$${totalSumPerPerson}`
                    }    
            }
        }    
     
     }         
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    calc();
    
})
function resetAll(){
    sumInput.value = ''
    customInput.value = ''
    peopleInput.value = ''
    for(let i =0;i<radioButtons.length;i++){
        radioButtons[i].checked = false;
    }
    totalP.textContent = "$00.00"
    tipTotalP.textContent = "$00.00"

}
function addChosingbyTab(){
    radioLabels[0].addEventListener('focus',(e)=>{
        radioLabels[0].addEventListener('keydown',(e)=>{
            if(e.key ==="Enter"){
                setTip();
                radioButtons[0].checked = true;
            }
        })
    })
    
    
    radioLabels[1].addEventListener('focus',(e)=>{
        radioLabels[1].addEventListener('keydown',(e)=>{
            if(e.key ==="Enter"){
                setTip();
                radioButtons[1].checked = true;
            }
        })
    })
    
    radioLabels[2].addEventListener('focus',(e)=>{
        radioLabels[2].addEventListener('keydown',(e)=>{
            if(e.key ==="Enter"){
                setTip();
                radioButtons[2].checked = true;
            }
        })
    })
    
    radioLabels[3].addEventListener('focus',(e)=>{
        radioLabels[3].addEventListener('keydown',(e)=>{
            if(e.key ==="Enter"){
                setTip();
                radioButtons[3].checked = true;
            }
        })
    })
    
    radioLabels[4].addEventListener('focus',(e)=>{
        radioLabels[4].addEventListener('keydown',(e)=>{
            if(e.key ==="Enter"){
                setTip();
                radioButtons[4].checked = true;
            }
        })
    })
}
addChosingbyTab()
radioButtons.forEach(radio => radio.addEventListener('click',setTip))
customInput.addEventListener('keyup',setTip)
resetButton.addEventListener('click',resetAll)


