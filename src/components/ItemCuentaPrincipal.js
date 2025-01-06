import React from "react";

export const ItemCuentaPrincipal = (({ tipo, numero, saldoDisponible, saldoAcreditar }) => {
    return(
        <div className="card">
          <img
            src="https://via.placeholder.com/50"
            alt="Cuenta"
            className="card-image"
          />
          <div className="details">
            <h4>Cuenta de {tipo}</h4>
            <p>{numero}</p>
          </div>
          <div className="balance">
            <p>
              Saldo Disponible: <strong>{saldoDisponible}</strong>
            </p>
            <p>
              Saldo por Efectivizar: <strong>{saldoAcreditar}</strong>
            </p>
          </div>
        </div>
    );
})