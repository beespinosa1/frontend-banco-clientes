import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ItemTarjeta = (( {numero, cupoAprobado, cupoDisponible, fechaCorte, id} ) => {
    const navigate = useNavigate();
    const porPagar = cupoAprobado - cupoDisponible;
    return (
        <div className="diferidos-card">
            <div className="diferidos-details">
                <h4 className="card-title">Mastercard</h4>
                <p className="card-number">{numero}</p>
            </div>
            <div className="diferidos-actions">
                <p>
                <strong>Por Pagar: </strong>$
                {porPagar ? porPagar.toFixed(2) : "0.00"}
            </p>
            <p>
                <strong>Disponible: </strong>$
                {cupoDisponible
                ? cupoDisponible.toFixed(2)
                : "0.00"}
            </p>
            <p>
                <strong>Cupo Total: </strong>$
                {cupoAprobado
                ? cupoAprobado.toFixed(2)
                : "0.00"}
            </p>
            <p>
                <strong>Fecha de Corte: </strong>
                {fechaCorte || "N/A"}
            </p>
            <div className="action-buttons">
                <button
                className="action-button"
                onClick={() =>
                    navigate("/tarjetas-credito/historial/" + id)
                }
                >
                Ver Movimientos
                </button>
            </div>
        </div>
        </div>
    );
})