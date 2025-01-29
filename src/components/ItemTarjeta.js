import React, { useState } from "react";

export const ItemTarjeta = (( {numero, cupoAprobado, cupoDisponible, franquicia} ) => {
    // Función para enmascarar el número de tarjeta
    const enmascararNumero = (numero) => {
        if (!numero) return 'XXXXXXXXXXXXXXXXXXXX';
        return numero.substring(0, 4) + 'XXXXXXXXXXXX';
    };

    return (
        <div className="card">
            <img
                src="https://via.placeholder.com/50"
                alt="Tarjeta"
                className="card-image"
            />
            <div className="details">
                <h4>{franquicia || 'MASTERCARD'}</h4>
                <p>{enmascararNumero(numero)}</p>
            </div>
            <div className="balance">
                <p>
                    Cupo total: <strong>${cupoAprobado ? cupoAprobado.toFixed(2) : "0.00"}</strong>
                </p>
                <p>
                    Disponible: <strong>${cupoDisponible ? cupoDisponible.toFixed(2) : "0.00"}</strong>
                </p>
            </div>
        </div>
    );
})