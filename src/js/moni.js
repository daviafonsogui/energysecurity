const e_email = localStorage.getItem("user-email")

document.querySelector("h1#stats").innerText = "Status dos detectores para, " + e_email  
function Sair(){
        window.location.assign("../index.html");
         localStorage.setItem("user-JWT", "");
        localStorage.setItem("user-email", "");

}
function Dec_Informations(){
    const token = localStorage.getItem("user-JWT");
    const email = localStorage.getItem("user-email");


    if(token.length < 3 && email.length < 3){
        return
    }




    const data = {
        "email":email,
    }
    AbstractFecth(appUrl.stateofdec, data, {
        'Content-Type': 'application/json' ,
        'Authorization': "Bearer " + token
        }, (result, msg)=>{
        if(msg === "error") return
        UpdateStates(result.detectoresstates)
        
    })
}
function UpdateStates(detectores){
    let i = 0 
    for(n of detectores){
        if(n == "caido"){
            const detector = document.querySelector("#dec_" + (i + 1))
            detector.innerHTML = "Sistema "+(i+1)+" - Desligado"
            detector.className = "desligado"

        } else {
            const detector = document.querySelector("#dec_" + (i + 1))
            detector.innerHTML = "Sistema "+(i+1)+" - Funcionando"
            detector.className = "funcionando"
        }
        i++
    }
}

setInterval(()=>{
    Dec_Informations()
}, 5000)