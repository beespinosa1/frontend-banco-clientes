import React, { useState } from "react";

export const ItemTarjeta = (({ numero, cupoAprobado, cupoDisponible, estado, handleBlockCard, handleUnblockCard, index, franquicia}) => {
    const porPagar = cupoAprobado - cupoDisponible;

    // Función para enmascarar el número de tarjeta
    const enmascararNumero = (numero) => {
        if (!numero) return 'XXXXXXXXXXXXXXXXXXXX';
        return numero.substring(0, 4) + 'XXXXXXXXXXXX';
    };

    return (
        <div key={index} className="bloqueos-card">
            <div className="bloqueos-details">
                <h4 className="card-title">{franquicia || 'MASTERCARD'}</h4>
                <p className="card-number">{enmascararNumero(numero)}</p>
            </div>
            <div className="bloqueos-actions">
                <p>
                    <strong>Por Pagar: </strong>${porPagar ? porPagar.toFixed(2) : "0.00"}
                </p>
                <p>
                    <strong>Disponible: </strong>${cupoDisponible ? cupoDisponible.toFixed(2) : "0.00"}
                </p>
                <div className="action-buttons">
                    <button
                        className="action-button"
                        onClick={estado === "ACT" ? handleBlockCard : handleUnblockCard}
                    >
                        {estado === "ACT" ? "Bloquear Tarjeta" : "Desbloquear Tarjeta"}
                    </button>
                </div>
            </div>
        </div>
    );
})
