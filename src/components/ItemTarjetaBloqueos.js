import React, { useState } from "react";

export const ItemTarjeta = (({ numero, cupoAprobado, cupoDisponible, estado, handleBlockCard, index}) => {
    const porPagar = cupoAprobado - cupoDisponible;

    return (
        <div key={index} className="bloqueos-card">
            <div className="bloqueos-details">
                <h4 className="card-title">Mastercard</h4>
                <p className="card-number">{numero}</p>
            </div>
            <div className="bloqueos-actions">
                <p>
                    <strong>Por Pagar: </strong>${porPagar.toFixed(2)}
                </p>
                <p>
                    <strong>Disponible: </strong>${cupoDisponible.toFixed(2)}
                </p>
                <div className="action-buttons">
                    <button
                        className="action-button"
                        onClick={handleBlockCard}
                        disabled={estado !== "PEN"}
                    >
                        {estado === "PEN" ? "Bloquear Tarjeta" : "Tarjeta Bloqueada"}
                    </button>
                </div>
            </div>
        </div>
    );
})
