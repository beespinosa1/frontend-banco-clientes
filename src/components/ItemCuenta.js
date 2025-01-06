import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export const ItemCuenta = (({ tipo, numero, saldoDisponible, saldoAcreditar, openModal, cuenta }) => {
    const navigate = useNavigate();
    return (
        <div className="diferidos-card">
            <div className="diferidos-details">
                <h4 className="card-title">{tipo}</h4>
                <p className="card-number">{numero}</p>
            </div>
            <div className="diferidos-actions">
                <p>
                    <strong>Disponible: </strong>${saldoDisponible.toFixed(2)}
                </p>
                <p>
                    <strong>Por Efectivizar: </strong>${saldoAcreditar.toFixed(2)}
                </p>
                <div className="action-buttons">
                    <button
                        className="action-button"
                        onClick={() =>
                            navigate("/cuentas/detalle-movimientos", {
                                state: { numeroCuenta: numero },
                            })
                        }
                    >
                        Ver Detalles
                    </button>
                    <button
                        className="action-button"
                        onClick={() => openModal(cuenta)}
                    >
                        Compartir
                    </button>
                </div>
            </div>
        </div>

    );
})