import React, { useState } from "react";

export const ItemTarjeta = (({ beneficiario, fechaContable, valor, estado, cuentaDebitada, id, descripcion}) => {
    return (
        <div className="diferidos-card">
            <div className="diferidos-details">
                <h4>{beneficiario}</h4>
                <p>Fecha: {fechaContable}</p>
                <p>
                    Monto Total: <strong>${valor}</strong>
                </p>
                <p>
                    Estado: <strong>{estado}</strong>
                </p>
                <p>
                    Cuenta Debitada: <strong>{cuentaDebitada}</strong>
                </p>
                <p>
                    Código de Transacción:{" "}
                    <strong>{id}</strong>
                </p>
                <p>
                    Descripción: <strong>{descripcion}</strong>
                </p>
            </div>
        </div>
    );
})
