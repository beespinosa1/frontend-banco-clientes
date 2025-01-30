import React, { useState } from "react";

export const ItemTarjeta = (({ historial }) => {
    return (
        <div className="diferidos-card">
            <div className="diferidos-details">
                <h4>{historial.detalleTransaccion.beneficiario}</h4>
                <p>Fecha: {historial.fechaHora}</p>
                <p>
                    Monto Total: <strong>${historial.valor}</strong>
                </p>
                <p>
                    Estado: <strong>{historial.estado}</strong>
                </p>
                <p>
                    Código de Transacción:{" "}
                    <strong>{historial. id}</strong>
                </p>
                <p>
                    Descripción: <strong>{historial.detalleTransaccion.descripcion}</strong>
                </p>
                <p>
                    Cuenta Destino: <strong>{historial.detalleTransaccion.cuentaDestino}</strong>
                </p>
            </div>
        </div>
    );
})
