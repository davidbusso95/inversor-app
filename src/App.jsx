// Importamos useState para manejar estado (valores dinámicos)
import { useState, useEffect } from "react";

function App() {
  // ==============================
  // ESTADOS PRINCIPALES
  // ==============================

  // Monto inicial
  const [monto, setMonto] = useState(1000);

  // Rendimiento anual en porcentaje
  const [rendimiento, setRendimiento] = useState(10);

  // Cantidad de años
  const [anios, setAnios] = useState(5);

  // Modo oscuro (false = claro, true = oscuro)
  const [darkMode, setDarkMode] = useState(false);

  // Historial de simulaciones
  const [simulaciones, setSimulaciones] = useState([]);

  // ==============================
  // CARGAR SIMULACIONES AL INICIAR
  // ==============================

  useEffect(() => {
    const guardadas = localStorage.getItem("simulaciones");

    if (guardadas) {
      setSimulaciones(JSON.parse(guardadas));
    }
  }, []);

  // ==============================
  // CALCULO DE INTERES COMPUESTO
  // ==============================

  const calcularInversion = () => {
    let capital = parseFloat(monto);
    const tasa = parseFloat(rendimiento) / 100;

    const resultado = [];

    for (let i = 1; i <= anios; i++) {
      capital = capital * (1 + tasa);

      resultado.push({
        anio: i,
        capital: parseFloat(capital.toFixed(2)),
      });
    }

    return resultado;
  };

  const resultados = calcularInversion();

  const capitalFinal = resultados[resultados.length - 1]?.capital || 0;

  const ganancia = (capitalFinal - monto).toFixed(2);

  // ==============================
  // GUARDAR SIMULACION
  // ==============================

  const guardarSimulacion = () => {
    const nuevaSimulacion = {
      monto,
      rendimiento,
      anios,
      capitalFinal,
    };

    const actualizadas = [...simulaciones, nuevaSimulacion];

    setSimulaciones(actualizadas);

    localStorage.setItem("simulaciones", JSON.stringify(actualizadas));
  };

  // ==============================
  // BORRAR HISTORIAL
  // ==============================

  const borrarHistorial = () => {
    setSimulaciones([]);
    localStorage.removeItem("simulaciones");
  };

  // ==============================
  // ESTILOS DINAMICOS
  // ==============================

  const estilos = {
    backgroundColor: darkMode ? "#111827" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: "40px",
    boxSizing: "border-box",
    fontFamily: "Arial",
    transition: "all 0.3s ease",
  };

  const estiloInput = {
    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    border: "1px solid #ccc",
    padding: "5px",
    marginBottom: "10px",
  };

  const estiloBoton = {
    marginTop: "15px",
    padding: "8px 15px",
    cursor: "pointer",
  };

  return (
    <div style={estilos}>
      <h1>Simulador de Inversión</h1>

      {/* BOTON MODO OSCURO */}
      <button onClick={() => setDarkMode(!darkMode)} style={estiloBoton}>
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>

      <div>
        <label>Monto inicial:</label>
        <br />
        <input
          type="number"
          value={monto}
          style={estiloInput}
          onChange={(e) => setMonto(e.target.value)}
        />
      </div>

      <div>
        <label>Rendimiento anual (%):</label>
        <br />
        <input
          type="number"
          value={rendimiento}
          style={estiloInput}
          onChange={(e) => setRendimiento(e.target.value)}
        />
      </div>

      <div>
        <label>Años:</label>
        <br />
        <input
          type="number"
          value={anios}
          style={estiloInput}
          onChange={(e) => setAnios(e.target.value)}
        />
      </div>

      <h2>Capital final: ${capitalFinal}</h2>
      <h3>Ganancia total: ${ganancia}</h3>

      {/* BOTON GUARDAR */}
      <button onClick={guardarSimulacion} style={estiloBoton}>
        Guardar simulación
      </button>

      {/* HISTORIAL */}
      <h3 style={{ marginTop: "30px" }}>Historial:</h3>

      {simulaciones.length === 0 ? (
        <p>No hay simulaciones guardadas.</p>
      ) : (
        <>
          <ul>
            {simulaciones.map((sim, index) => (
              <li key={index}>
                ${sim.monto} al {sim.rendimiento}% por {sim.anios} años → Final:
                ${sim.capitalFinal}
              </li>
            ))}
          </ul>

          <button onClick={borrarHistorial} style={estiloBoton}>
            Borrar historial
          </button>
        </>
      )}

      {/* CRECIMIENTO AÑO POR AÑO */}
      <h3 style={{ marginTop: "30px" }}>Crecimiento año por año:</h3>
      <ul>
        {resultados.map((item) => (
          <li key={item.anio}>
            Año {item.anio}: ${item.capital}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
