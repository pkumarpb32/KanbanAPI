import Responsable from "./Responsable.js"
import {Db} from './db.js'
import { API } from "./api.js";

const div_add = document.getElementById("add_responsible");
const btn_show = document.getElementById("add_resp");
const btn_add = document.getElementById("btn_add_resp")
const info_resp = document.getElementById("info_resp");
const btn_si = document.getElementById("btn_si");
const btn_no = document.getElementById("btn_no");
const close_btn = document.getElementsByClassName("close");
var codi;
var check_click_info = 0;

// var dataBase = new Db();
var resp_llista = []
// var resp_llista = [] = JSON.parse(window.localStorage.getItem(nom_storage) || "[]")
var dataBase = new API();

dataBase.getResp().then((i)=>
{
  resp_llista = i;
  console.log(resp_llista)
  if(resp_llista.length != 0)
  {
    load_responsible();
  }
});

btn_show.addEventListener("click", ()=>{
  
    div_add.style.display = "block";
  
 })
btn_add.addEventListener("click", addResp);

btn_si.addEventListener("click", ()=>{
  // eliminem la tasca seleccionada
  eliminar_responsable(codi);
  document.getElementById("delete_resp").style.display = "none";
});

btn_no.addEventListener("click", ()=>{
  document.getElementById("delete_resp").style.display = "none";
});

close_btn[0].addEventListener("click", ()=>{
  clearValues();
  div_add.style.display = "none"
});

// carregar tots els responsables
function load_responsible(){
    resp_llista.forEach(element => {
        let li = document.createElement("div")
        li.appendChild(document.createTextNode(element.nom))
        li.classList.add("responsable")
        li.addEventListener('click', info);
        li.id = element.codi;
        document.getElementById("resp_list").appendChild(li);
        afegirButtons(element.codi);
    });
}

// Afegir buttons per eliminar i modificar tasques
function afegirButtons(code){
  var btn_modificar = document.createElement('button');
  btn_modificar.type = 'button';
  btn_modificar.innerHTML = '<span class="material-icons">edit</span>';
  btn_modificar.onclick = function() {
    let r =  resp_llista.find(element => element.codi == code);
    document.getElementById("name").value = r.nom;
    document.getElementById("email").value = r.email;
    div_add.style.display = "block"
    codi = code;
  };

    var btn_delete = document.createElement('button');
    btn_delete.type = 'button';
    btn_delete.innerHTML = '<span class="material-icons">delete</span>';
    btn_delete.onclick = function(e) {
      document.getElementById("delete_resp").style.display = "block";
      codi = code;
    };
  var div_tasques = document.createElement("div");
  div_tasques.appendChild(btn_delete);
  div_tasques.appendChild(btn_modificar);
  document.getElementById(code).appendChild(div_tasques);
}

function eliminar_responsable(id){
    let r =  resp_llista.find(element => element.codi == id);
    resp_llista.splice(resp_llista.indexOf(r),1);
    document.getElementById(id).remove();
    dataBase.deleteResp(id);
  };

function addResp()
{
  // comprovar que el camp nom no sigui buit
  if(document.getElementById("name").value != "" && document.getElementById("email").value != ""){
 // comprovar si existeix una tasca amb el mateix nom
  let resp = resp_llista.find(element => element.codi == codi);
  // si no trobem la tasca, creem una de nova
  if(resp == null)
  {
    resp = new Responsable();
    resp.codi = Date.now();
  }

  if(!check_resp(document.getElementById("name").value) || resp.nom == document.getElementById("name").value)
  { 
    if(validateEmail(document.getElementById("email").value))
    {
      if(resp.codi == codi){
        eliminar_responsable(resp.codi);
      }
      resp.nom = document.getElementById("name").value;
      resp.email = document.getElementById("email").value;
      resp_llista.push(resp);
      dataBase.addResp(resp);   // firebase    
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(resp.nom));
      div.classList.add("responsable");
      div.addEventListener('click', info);
      div.id = resp.codi;
      document.getElementById("resp_list").appendChild(div);
      afegirButtons(resp.codi);
      div_add.style.display = "none";
      if(info_resp.style.display = "block"){
        info_resp.style.display = "none";
      }
      clearValues();
  }
    else
    {
      alert('Email is not valid');
    }    
   }
   else{
       alert('El nom introdu??t ja existex');
     }
   }
   else{
       alert('Amplia tots els camps!');
     }
 }
  
 function check_resp(task_name){
  let t =  resp_llista.find(element => element.nom == task_name);
  if(t != null){
    return true;
  }
  else{
    return false;
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function clearValues(){
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function info(event)
{
  if(check_click_info != event.target.id)
  {
    let t =  resp_llista.find(element => element.codi == event.target.id);
    document.getElementById("nom_resp").innerHTML = t.nom;
    document.getElementById("email_resp").innerHTML = t.email;
    event.target.parentNode.insertBefore(info_resp, event.target.nextSibling);
    info_resp.style.display = "block";
    check_click_info = event.target.id;
  }
  else
  {
    info_resp.style.display = "none";
    check_click_info = 0;
  }
}
  
document.getElementById("change_tasks").addEventListener("click", ()=>{
  document.location.href = "./index.html";
});