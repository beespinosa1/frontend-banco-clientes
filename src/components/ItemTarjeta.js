import React, { useState } from "react";

export const ItemTarjeta = (( {numero, cupoAprobado, cupoDisponible} ) => {
    return (
        <div className="card">
            <img
                src="https://via.placeholder.com/50"
                alt="Tarjeta"
                className="card-image"
            />
            <div className="details">
                <h4>Mastercard</h4>
                <p>{numero}</p>
            </div>
            <div className="balance">
                <p>
                    Cupo total: <strong>${cupoAprobado}</strong>
                </p>
                <p>
                    Disponible: <strong>${cupoDisponible}</strong>
                </p>
            </div>
        </div>
    );
})