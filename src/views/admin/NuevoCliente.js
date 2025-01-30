import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminSidebar } from "../../components/AdminSidebar";

const NuevoCliente = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tipoCliente, setTipoCliente] = useState(
    location.state?.tipoCliente || ""
  );
  //PERSONA NATURAL
  const [formData, setFormData] = useState({
    tipoIdentificacion: "",
    identificacion: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    numeroTelefonico: "",
    fechaNacimiento: "",
    ingresoMensual: "",
  });

  // PERSONA JURIDICA
  const [formDataJuridico, setFormDataJuridico] = useState({
    identificacionRepresentante: "",
    ruc: "",
    nombreComercial: "",
    razonSocial: "",
    email: "",
    numeroTelefonico: "",
    fechaConstitucion: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //PERSONA NATURAL
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //PERSONA JURIDICA
  const handleInputChangeJuridico = (e) => {
    const { name, value } = e.target;
    setFormDataJuridico((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //PERSONA NATURAL
  const validarFormulario = () => {
    if (!formData.tipoIdentificacion) {
      setError("El tipo de identificación es obligatorio");
      return false;
    }
    if (!formData.identificacion) {
      setError("La identificación es obligatoria");
      return false;
    }
    if (!formData.primerNombre) {
      setError("El primer nombre es obligatorio");
      return false;
    }
    if (!formData.primerApellido) {
      setError("El primer apellido es obligatorio");
      return false;
    }
    if (!formData.segundoApellido) {
      setError("El segundo apellido es obligatorio");
      return false;
    }
    if (!formData.email) {
      setError("El email es obligatorio");
      return false;
    }
    if (!formData.numeroTelefonico) {
      setError("El número telefónico es obligatorio");
      return false;
    }
    if (!formData.fechaNacimiento) {
      setError("La fecha de nacimiento es obligatoria");
      return false;
    }
    if (!formData.ingresoMensual || formData.ingresoMensual <= 0) {
      setError("El ingreso mensual es obligatorio y debe ser mayor a 0");
      return false;
    }
    return true;
  };

  //PERSONA JURIDICA
  const validarFormularioJuridico = () => {
    if (!formDataJuridico.identificacionRepresentante) {
      setError("La identificación del representante legal es obligatoria");
      return false;
    }
    if (!formDataJuridico.ruc) {
      setError("El ruc es obligatorio");
      return false;
    }
    if (!formDataJuridico.razonSocial) {
      setError("La razón social es obligatoria");
      return false;
    }
    if (!formDataJuridico.numeroTelefonico) {
      setError("El número de teléfono es obligatorio");
      return false;
    }
    if (!formDataJuridico.nombreComercial) {
      setError("El nombre comercial es obligatorio");
      return false;
    }
    if (!formDataJuridico.fechaConstitucion) {
      setError("La fecha es obligatoria");
      return false;
    }
    if (!formDataJuridico.email) {
      setError("El email es obligatorio");
      return false;
    }
    return true;
  };

  //PERSONA NATURAL
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "http://3.144.89.85:80/v1/personas-naturales",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate("/admin/clientes", {
          state: {
            message: "Cliente creado exitosamente",
            tipoCliente: "natural",
            identificacion: formData.identificacion,
          },
        });
      } else {
        const data = await response.json();
        setError(data.message || "Error al crear el cliente");
      }
    } catch (error) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  //PERSONA JURIDICA
  const handleSubmitJuridico = async (e) => {
    e.preventDefault();
    if (!validarFormularioJuridico()) return;

    setLoading(true);
    try {
      const personaNatural = await buscarPersonaPorIdentificacion(
        formDataJuridico.identificacionRepresentante
      );


      const datosJuridicos = {
        ...formDataJuridico,
        personaNaturalId: personaNatural.id,
        identificacionRepresentante: undefined
      };

      const response = await fetch(
        "http://3.144.89.85:80/v1/personas-juridicas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosJuridicos),
        }
      );

      if (response.ok) {
        navigate("/admin/clientes", {
          state: {
            message: "Cliente jurídico creado exitosamente",
            tipoCliente: "juridica",
          },
        });
      } else {
        const data = await response.json();
        setError(data.message || "Error al crear el cliente Jurídico");
      }
    } catch (error) {
      setError(error.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const buscarPersonaPorIdentificacion = async (identificacion) => {
    try {
      const response = await fetch(
        `http://3.144.89.85:80/v1/personas-naturales/identificacion/${identificacion}`
      );
      if (!response.ok) {
        throw new Error("No se encontró la persona");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <div className="header">
          <h1>Nuevo Cliente</h1>
        </div>

        <div style={{ padding: "2rem" }}>
          {!tipoCliente ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
                Seleccione el tipo de cliente
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                }}
              >
                <button
                  onClick={() => setTipoCliente("natural")}
                  style={{
                    padding: "2rem",
                    border: "2px solid #ff6b35",
                    borderRadius: "8px",
                    background: "white",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <i
                    className="fas fa-user"
                    style={{ fontSize: "2rem", color: "#ff6b35" }}
                  ></i>
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    Persona Natural
                  </span>
                </button>

                <button
                  onClick={() => setTipoCliente("juridica")}
                  style={{
                    padding: "2rem",
                    border: "2px solid #ff6b35",
                    borderRadius: "8px",
                    background: "white",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <i
                    className="fas fa-building"
                    style={{ fontSize: "2rem", color: "#ff6b35" }}
                  ></i>
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    Persona Jurídica
                  </span>
                </button>
              </div>
            </div>
          ) : tipoCliente === "natural" ? (
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <button
                  onClick={() => setTipoCliente("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "1rem",
                  }}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2>Registro de Persona Natural</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Tipo de Identificación *
                      </label>
                      <select
                        name="tipoIdentificacion"
                        value={formData.tipoIdentificacion}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          backgroundColor: "white",
                        }}
                      >
                        <option value="">Seleccione...</option>
                        <option value="CED">Cédula</option>
                        <option value="RUC">RUC</option>
                        <option value="PAS">Pasaporte</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Primer Nombre *
                      </label>
                      <input
                        type="text"
                        name="primerNombre"
                        value={formData.primerNombre}
                        onChange={handleInputChange}
                        required
                        maxLength="32"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Primer Apellido *
                      </label>
                      <input
                        type="text"
                        name="primerApellido"
                        value={formData.primerApellido}
                        onChange={handleInputChange}
                        required
                        maxLength="32"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        maxLength="50"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Fecha de Nacimiento *
                      </label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Ingreso Mensual *
                      </label>
                      <input
                        type="number"
                        name="ingresoMensual"
                        value={formData.ingresoMensual}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Número de Identificación *
                      </label>
                      <input
                        type="text"
                        name="identificacion"
                        value={formData.identificacion}
                        onChange={handleInputChange}
                        required
                        maxLength="13"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Segundo Nombre
                      </label>
                      <input
                        type="text"
                        name="segundoNombre"
                        value={formData.segundoNombre}
                        onChange={handleInputChange}
                        maxLength="32"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Segundo Apellido *
                      </label>
                      <input
                        type="text"
                        name="segundoApellido"
                        value={formData.segundoApellido}
                        onChange={handleInputChange}
                        required
                        maxLength="32"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Número Telefónico *
                      </label>
                      <input
                        type="tel"
                        name="numeroTelefonico"
                        value={formData.numeroTelefonico}
                        onChange={handleInputChange}
                        required
                        maxLength="10"
                        pattern="[0-9]{10}"
                        title="Debe ingresar 10 dígitos"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <p
                    style={{
                      color: "red",
                      marginBottom: "1rem",
                      backgroundColor: "#fee",
                      padding: "0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {error}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => navigate("/admin/clientes")}
                    style={{
                      padding: "0.75rem 1.5rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "0.75rem 1.5rem",
                      border: "none",
                      borderRadius: "4px",
                      background: loading ? "#ccc" : "#ff6b35",
                      color: "white",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Guardando...
                      </>
                    ) : (
                      "Guardar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <button
                  onClick={() => setTipoCliente("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "1rem",
                  }}
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2>Registro de Persona Juridica</h2>
              </div>

              <form onSubmit={handleSubmitJuridico}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Identificación del Representante Legal *
                      </label>
                      <input
                        type="text"
                        name="identificacionRepresentante"
                        value={formDataJuridico.identificacionRepresentante}
                        onChange={handleInputChangeJuridico}
                        required
                        maxLength="13"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        RUC *
                      </label>
                      <input
                        type="text"
                        name="ruc"
                        value={formDataJuridico.ruc}
                        onChange={handleInputChangeJuridico}
                        required
                        maxLength="13"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Razón Social *
                      </label>
                      <input
                        type="text"
                        name="razonSocial"
                        value={formDataJuridico.razonSocial}
                        onChange={handleInputChangeJuridico}
                        required
                        maxLength="256"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formDataJuridico.email}
                        onChange={handleInputChangeJuridico}
                        required
                        maxLength="64"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Fecha Constitución *
                      </label>
                      <input
                        type="date"
                        name="fechaConstitucion"
                        value={formDataJuridico.fechaConstitucion}
                        onChange={handleInputChangeJuridico}
                        required
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Nombre Comercial*
                      </label>
                      <input
                        type="text"
                        name="nombreComercial"
                        value={formDataJuridico.nombreComercial}
                        onChange={handleInputChangeJuridico}
                        required
                        maxLength="128"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        Número Telefónico *
                      </label>
                      <input
                        type="tel"
                        name="numeroTelefonico"
                        value={formDataJuridico.numeroTelefonico}
                        onChange={handleInputChangeJuridico}
                        required
                        maxLength="10"
                        pattern="[0-9]{10}"
                        title="Debe ingresar 10 dígitos"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <p
                    style={{
                      color: "red",
                      marginBottom: "1rem",
                      backgroundColor: "#fee",
                      padding: "0.75rem",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {error}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => navigate("/admin/clientes")}
                    style={{
                      padding: "0.75rem 1.5rem",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "0.75rem 1.5rem",
                      border: "none",
                      borderRadius: "4px",
                      background: loading ? "#ccc" : "#ff6b35",
                      color: "white",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Guardando...
                      </>
                    ) : (
                      "Guardar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NuevoCliente;
