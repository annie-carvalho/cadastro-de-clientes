export function validarCliente({ nome, email }) {
    return nome.trim() !== "" && email.trim() !== "";
}