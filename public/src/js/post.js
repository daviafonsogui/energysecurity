
const appUrl = {
    login:"https://app-sec-moni.onrender.com/login_api",
    sign:"https://app-sec-moni.onrender.com/cadastro_api",
    stateofdec:"https://app-sec-moni.onrender.com/state_of_detectores",

}

function Login(){

    const email = document.querySelector("#inp_email")
    const pass = document.querySelector("#inp_pass")
    const data = {
        "email":email.value,
        "password":pass.value
    }

    AbstractFecth(appUrl.login, data, {
        'Content-Type': 'application/json'
    }, (result, msg)=>{
        if(msg=== "error") return
        console.log(result)
        localStorage.setItem("user-JWT", result);
        localStorage.setItem("user-email", email.value);
        window.location.assign("../Pages/monitoramento.html");
    })


}

function Cadastro(){

    const usuario = document.querySelector("#inp_name")
    const email = document.querySelector("#inp_email")
    const pass = document.querySelector("#inp_pass")
    const data = {
        "name":usuario.value,
        "email":email.value,
        "password":pass.value,
        "detectores":["caido", "caido", "caido"]
    }


    AbstractFecth(appUrl.sign, data, {
        'Content-Type': 'application/json'
    }, (result, msg)=>{
        if(msg=== "error") return
        console.log(result)
        localStorage.setItem("user-JWT", result);
        localStorage.setItem("user-email", email.value);
        window.location.assign("../Pages/monitoramento.html");
    })

}



function Setup(){
    const token = localStorage.getItem("user-JWT");
    const email = localStorage.getItem("user-email");
    const pass = "9998702020"



    const data = {
        "email":email,
        "password": pass
    }
    AbstractFecth(appUrl.stateofdec, data, {
        'Content-Type': 'application/json' ,
        'Authorization': "Bearer " + token
    }, (result, msg)=>{
        if(msg === "erro") return
        window.location.assign("./Pages/monitoramento.html");
    })
    

}





function AbstractFecth(url, data, headers, call){
    fetch(url, {
    method: 'POST', 
    headers: headers,
    body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json(); 
    })
    .then(result => {
        call(result, "ok")
    })
    .catch(error => {
        call(error, "erro")
    });
}