import { Cliente } from "./classes.js";
import { validarCliente } from "./utils.js";


const baseURL = "https://685d0d08769de2bf085f18f3.mockapi.io/cadastro/cadastro";

const form = document.getElementById("clientForm");
const list = document.getElementById("clientList");
const tpl = document.getElementById("clientItem");

async function fetchClients() {
    try{
        const res = await fetch(baseURL);
        if (!res.ok) throw new Error("Falha ao listar");
        const data = await res.json();
        console.log("Cliente da API", data);
        render(data);
    }   catch (err) {
        console.error(err);
    }
}

async function addClient(nome, email) {
    try{
        const cliente = new Cliente (nome, email);
        await fetch(baseURL, {
            method : "POST",
            headers: { "Content-Type": "application/json"},
            body : JSON.stringify({
            name: cliente.nome,
            email: cliente.email
            })
        });
        fetchClients();
    } catch (err){
        console.error(err);
    }
}

async function deleteClient(id) {
    try {
        await fetch(`${baseURL}/${id}`, {method: "DELETE"});
        fetchClients();
    } catch (err) {
        console.error(err);
    }
}

function render(clients = []) {
    list.innerHTML = "";
    clients.map(cliente => {
        const node = tpl.content.cloneNode(true);
        const li  = node.querySelector("li");
        li.dataset.id = cliente.id;
        node.querySelector(".info").textContent = `${cliente.name} - ${cliente.email}`;
        node.querySelector(".delete").addEventListener("click", () => deleteClient(cliente.id));
        list.appendChild(node);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    if (validarCliente({ nome, email })) {
        addClient(nome, email);
    form.reset();
    } else {
        alert("Preencha todos os campos.");
    }
});

document.addEventListener("DOMContentLoaded", fetchClients);