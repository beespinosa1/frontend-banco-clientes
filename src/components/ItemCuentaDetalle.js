import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const ItemCuentaDetalle = (({ tipo, fecha, montoTotal, estado, codigoTransaccion, descripcion, beneficiario }) => {
    const navigate = useNavigate();
    return (
        <div className="diferidos-card">
            <div className="diferidos-details">
                <h4>{tipo}</h4>
                <p>Fecha: {fecha}</p>
                <p>
                    Monto Total: <strong>{montoTotal}</strong>
                </p>
                <p>
                    Estado: <strong>{estado}</strong>
                </p>
                <p>
                    Código de Transacción:{" "}
                    <strong>{codigoTransaccion}</strong>
                </p>
                <p>
                    Descripción: <strong>{descripcion}</strong>
                </p>
                <p>
                    Beneficiario: <strong>{beneficiario}</strong>
                </p>
            </div>
        </div>
    );
})