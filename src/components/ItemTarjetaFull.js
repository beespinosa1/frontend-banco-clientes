import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ItemTarjeta = (( {numero, cupoAprobado, cupoDisponible, fechaCorte, id, franquicia} ) => {
    const navigate = useNavigate();
    const porPagar = cupoAprobado - cupoDisponible;
    
    // Función para enmascarar el número de tarjeta
    const enmascararNumero = (numero) => {
        if (!numero) return 'XXXXXXXXXXXXXXXXXXXX';
        return numero.substring(0, 4) + 'XXXXXXXXXXXX';
    };

    // Función para formatear la fecha de corte con el mes actual
    const formatearFechaCorte = (dia) => {
        if (!dia) return 'N/A';
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fecha = new Date();
        const diaActual = fecha.getDate();
        let mesIndex = fecha.getMonth();

        // Si el día de corte ya pasó este mes, mostrar el siguiente mes
        if (diaActual >= dia) {
            mesIndex = (mesIndex + 1) % 12; // Usar módulo 12 para volver a enero si estamos en diciembre
        }

        return `${dia} de ${meses[mesIndex]}`;
    };

    return (
        <div className="diferidos-card">
            <div className="diferidos-details">
                <h4 className="card-title">{franquicia || 'MASTERCARD'}</h4>
                <p className="card-number">{enmascararNumero(numero)}</p>
            </div>
            <div className="diferidos-actions">
                <p>
                    <strong>Por Pagar: </strong>$
                    {porPagar ? porPagar.toFixed(2) : "0.00"}
                </p>
                <p>
                    <strong>Disponible: </strong>$
                    {cupoDisponible ? cupoDisponible.toFixed(2) : "0.00"}
                </p>
                <p>
                    <strong>Cupo Total: </strong>$
                    {cupoAprobado ? cupoAprobado.toFixed(2) : "0.00"}
                </p>
                <p>
                    <strong>Fecha de Corte: </strong>
                    {formatearFechaCorte(fechaCorte)}
                </p>
                <div className="action-buttons">
                    <button
                        className="action-button"
                        onClick={() => navigate("/tarjetas-credito/historial/" + id)}
                    >
                        Ver Movimientos
                    </button>
                </div>
            </div>
        </div>
    );
})