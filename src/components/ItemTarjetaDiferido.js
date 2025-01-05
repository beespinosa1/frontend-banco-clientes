import React, { useState } from "react";

export const ItemTarjeta = (({ tipo, beneficiario, fechaContable, valor, cuotas, cuotasCanceladas, valorCuota, porcentajeInteres, cuentaDebitada, id, descripcion, handleSolicitarDiferidoClick }) => {
    const cuotasRestantes = cuotas - cuotasCanceladas;
    // Solo renderizar si el tipo es diferido
    if (tipo !== "DIF") {
        return null;
    }
    return (
        <div className="diferidos-card">
            <div className="diferidos-details">
                <h4>{beneficiario}</h4>
                <p>Fecha: {fechaContable}</p>
                <p>
                    Monto Total: <strong>${valor}</strong>
                </p>
                <p>
                    Cuotas Restantes: <strong>{cuotasRestantes}</strong>
                </p>
                <p>
                    Valor Cuota: <strong>{valorCuota}</strong>
                </p>
                <p>
                    Porcentaje Interés: <strong>{porcentajeInteres}</strong>
                </p>
                <p>
                    Cuenta Debitada: <strong>{cuentaDebitada}</strong>
                </p>
                <p>
                    Código de Transacción: <strong>{id}</strong>
                </p>
                <p>
                    Descripción: <strong>{descripcion}</strong>
                </p>
                <div className="diferidos-actions">
                    <button
                        className="action-button"
                        onClick={handleSolicitarDiferidoClick}
                    >
                        Solicitar Nuevo Diferido
                    </button>
                </div>
            </div>
        </div>
    );
})