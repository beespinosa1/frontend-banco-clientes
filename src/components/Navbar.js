import React from "react";

export const Navbar = (({ titulo }) => {
    const usuario = JSON.parse(localStorage.getItem('cliente'))
    const tipoPersona = usuario.cliente.tipo;
    const persona = tipoPersona == 'PER'
        ? usuario.cliente.personaNatural
        : usuario.cliente.personaJuridica
    ;

    const nombreMostrar = tipoPersona == 'PER'
        ? persona.primerNombre + " " + persona.segundoApellido + " " + persona.primerApellido + " " + persona.segundoApellido
        : persona.razonSocial
    ;

    const fechaISO = usuario.fechaUltimoIngreso;
    const fecha = new Date(fechaISO);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    const fechaFormateada = `${dia}-${mes}-${año} ${hora}:${minutos}:${segundos}`;

    return (
        <div className="header">
            <h1>{titulo}</h1>
            <div className="user-info">
                <p>
                    <strong>{nombreMostrar}</strong> Último ingreso: {fechaFormateada}
                </p>
            </div>
        </div>
    )
})