const plan1 = document.getElementById('plan1');
const plan2 = document.getElementById('plan2');
const modal = document.getElementById('emergente');
const plan = document.getElementById('suscripcion');

document.getElementById('plan1').onclick = function(){
    plan1.style.background = 'rgb(224, 176, 18)'
    plan1.style.color = 'white'
    plan2.style.background = ''
    plan2.style.color = 'black'
    plan.value = "simple"
}

document.getElementById('plan2').onclick = function(){
    plan2.style.background = 'rgb(224, 176, 18)'
    plan2.style.color = 'white'
    plan1.style.background = ''
    plan1.style.color = 'black'
    plan.value = "premium"
}

/*document.getElementById('metodo-pago').onclick =function(){
    modal.showModal()
}*/
function metodo_pago(){
    eleccion = plan.value
    console.log(eleccion)
    if (eleccion != ""){
        modal.showModal()
    }else{
        alert("Elija el plan")
    }
}
/*function seleccion(){
    console.log('asdsad')
}*/