import { useState } from "react"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import "./App.css"

const preguntas = [
  {
    pregunta: "¿Qué es la comunicación según la Real Academia de la Lengua Española?",
    opciones: [
      "El intercambio de ideas entre personas",
      "La transmisión de señales mediante un código común al emisor y al receptor",
      "El proceso de enviar y recibir mensajes",
      "La habilidad de hablar en público",
    ],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Cuáles son las dos formas principales de comunicación verbal?",
    opciones: ["Visual y auditiva", "Escrita y gestual", "Oral y escrita", "Formal e informal"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál de los siguientes NO es un elemento de la comunicación?",
    opciones: ["Emisor", "Receptor", "Contexto", "Ortografía"],
    respuestaCorrecta: 3,
  },
  {
    pregunta: "¿Cuáles son los tres propósitos generales de la comunicación mencionados en el material?",
    opciones: [
      "Informar, entretener, persuadir",
      "Explicar, describir, definir",
      "Hablar, escuchar, escribir",
      "Leer, escribir, hablar",
    ],
    respuestaCorrecta: 0,
  },
  {
    pregunta: "¿Qué propósito de la comunicación consiste en dar a conocer algún acontecimiento, tema o situación?",
    opciones: ["Entretener", "Persuadir", "Informar", "Improvisar"],
    respuestaCorrecta: 2,
  },
  {
    pregunta:
      "¿Cuál es el propósito específico de informar que consiste en dar a conocer un proceso o funcionamiento de algo?",
    opciones: ["Describir", "Definir", "Explicar", "Exponer"],
    respuestaCorrecta: 2,
  },
  {
    pregunta:
      "¿Qué propósito específico de informar se refiere a dar las características esenciales o accidentales de algo?",
    opciones: ["Explicar", "Describir", "Definir", "Exponer"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Cuál es el propósito de la comunicación que pretende divertir o recrear el ánimo de alguien?",
    opciones: ["Informar", "Entretener", "Persuadir", "Improvisar"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Qué propósito de la comunicación intenta modificar la conducta o la opinión de una o más personas?",
    opciones: ["Informar", "Entretener", "Persuadir", "Improvisar"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es el propósito específico de persuadir que busca lograr que alguien realice una acción?",
    opciones: ["Motivar a la acción", "Convencer o formar", "Convencer o reforzar", "Convencer cambiar"],
    respuestaCorrecta: 0,
  },
  {
    pregunta: "¿Qué es la improvisación en el contexto de la comunicación?",
    opciones: [
      "Hablar sin preparación previa",
      "Leer un guión preparado",
      "Actuar de forma espontánea sin un guión",
      "Memorizar un discurso",
    ],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué término se refiere al lenguaje corporal y gestual que acompaña al lenguaje oral?",
    opciones: ["Lenguaje verbal", "Lenguaje escrito", "Lenguaje paralingüístico", "Lenguaje formal"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál de las siguientes NO es una cualidad de la voz mencionada en el material?",
    opciones: ["Tono", "Dicción", "Ritmo", "Volumen"],
    respuestaCorrecta: 3,
  },
  {
    pregunta: "¿Qué cualidad de la voz se refiere al volumen alto o bajo?",
    opciones: ["Tono", "Dicción", "Ritmo", "Expresividad"],
    respuestaCorrecta: 0,
  },
  {
    pregunta: "¿Qué es la dicción?",
    opciones: [
      "El volumen de la voz",
      "La velocidad del habla",
      "Saber articular y pronunciar las palabras correctamente",
      "La entonación de las frases",
    ],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál de las siguientes NO es una regla principal de la dicción?",
    opciones: ["Claridad", "Corrección", "Variedad melodiosa", "Rapidez"],
    respuestaCorrecta: 3,
  },
  {
    pregunta: "¿Qué cualidad de la voz se refiere a las combinaciones de acentos, ritmos y pausas?",
    opciones: ["Tono", "Dicción", "Ritmo", "Expresividad"],
    respuestaCorrecta: 2,
  },
  {
    pregunta:
      "¿Qué aspecto de la comunicación se refiere a la agitación pasajera que sufre una persona cuando se impresiona con algo?",
    opciones: ["Tono", "Dicción", "Ritmo", "Expresividad"],
    respuestaCorrecta: 3,
  },
  {
    pregunta: "¿Cuál es la función principal de las pausas en la comunicación oral?",
    opciones: [
      "Aumentar el volumen",
      "Mejorar la dicción",
      "Agrupar las palabras en bloques con significado",
      "Cambiar el tema de conversación",
    ],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué aspecto de la variedad vocal se refiere a poner énfasis o fuerza a ciertas palabras?",
    opciones: ["Tono", "Dicción", "Entonación", "Expresividad"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué se refiere al grado en que el hablante se involucra con la información que está expresando?",
    opciones: ["Tono", "Dicción", "Entonación", "Interpretación"],
    respuestaCorrecta: 3,
  },
  {
    pregunta: "¿Cuál es una de las formas más primarias de comunicación oral mencionadas en el material?",
    opciones: ["Escritura", "Lenguaje de señas", "Gritos y silbidos", "Lectura"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué se considera la forma más evolucionada de comunicación oral?",
    opciones: ["Gritos", "Silbidos", "Lenguaje articulado", "Gestos"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál de los siguientes NO es un propósito específico de informar?",
    opciones: ["Explicar", "Describir", "Definir", "Persuadir"],
    respuestaCorrecta: 3,
  },
  {
    pregunta: "¿Qué tipo de comunicación usa principalmente la función expresiva del lenguaje?",
    opciones: ["Informar", "Entretener", "Persuadir", "Improvisar"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Cuál es el objetivo principal de la comunicación persuasiva?",
    opciones: [
      "Informar sobre hechos",
      "Entretener al público",
      "Modificar la conducta o la opinión",
      "Mejorar la dicción",
    ],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué cualidad de la voz se refiere a la velocidad con que ocurren los acentos, ritmos y pausas?",
    opciones: ["Tono", "Dicción", "Ritmo", "Expresividad"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es un consejo mencionado para adquirir una buena dicción?",
    opciones: [
      "Hablar en voz muy alta",
      "Leer textos muy rápidamente",
      "Poner un lápiz entre los dientes y decir trabalenguas",
      "Evitar hacer pausas al hablar",
    ],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué se recomienda para lograr una buena interpretación en la comunicación oral?",
    opciones: [
      "Memorizar el texto palabra por palabra",
      "Improvisar todo el discurso",
      "Tener pleno conocimiento del tema que se está interpretando",
      "Hablar lo más rápido posible",
    ],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es la ventaja principal del lenguaje oral sobre el escrito, según el material?",
    opciones: [
      "Es más formal",
      "Es inmediato, espontáneo y altamente persuasivo",
      "Siempre es más claro",
      "No requiere preparación",
    ],
    respuestaCorrecta: 1,
  },
]

function App() {
  const [respuestas, setRespuestas] = useState<number[]>(new Array(preguntas.length).fill(-1))
  const [mostrarResultados, setMostrarResultados] = useState(false)

  const handleRespuesta = (preguntaIndex: number, opcionIndex: number) => {
    const nuevasRespuestas = [...respuestas]
    nuevasRespuestas[preguntaIndex] = opcionIndex
    setRespuestas(nuevasRespuestas)
  }

  const calcularPuntuacion = () => {
    return respuestas.reduce((total, respuesta, index) => {
      return total + (respuesta === preguntas[index].respuestaCorrecta ? 1 : 0)
    }, 0)
  }

  const generarPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text("Resultados del Examen de Expresión Oral y Escrita II", 20, 20)

    doc.setFontSize(12)
    doc.text(`Puntuación: ${calcularPuntuacion()} / ${preguntas.length}`, 20, 30)

    const tableData = preguntas.map((pregunta, index) => [
      index + 1,
      pregunta.pregunta,
      pregunta.opciones[respuestas[index]],
      pregunta.opciones[pregunta.respuestaCorrecta],
      respuestas[index] === pregunta.respuestaCorrecta ? "Correcta" : "Incorrecta",
    ])
    ;(doc as any).autoTable({
      startY: 40,
      head: [["#", "Pregunta", "Tu respuesta", "Respuesta correcta", "Resultado"]],
      body: tableData,
    })

    doc.save("resultados-examen-expresion-oral-escrita.pdf")
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Examen de Expresión Oral y Escrita II</h1>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(respuestas.filter((r) => r !== -1).length / preguntas.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {respuestas.filter((r) => r !== -1).length} de {preguntas.length} preguntas respondidas
        </p>
        {preguntas.map((pregunta, preguntaIndex) => (
          <div key={preguntaIndex} className="pregunta">
            <h3>{`${preguntaIndex + 1}. ${pregunta.pregunta}`}</h3>
            <div className="opciones">
              {pregunta.opciones.map((opcion, opcionIndex) => (
                <label key={opcionIndex} className="opcion">
                  <input
                    type="radio"
                    name={`pregunta-${preguntaIndex}`}
                    checked={respuestas[preguntaIndex] === opcionIndex}
                    onChange={() => handleRespuesta(preguntaIndex, opcionIndex)}
                    disabled={mostrarResultados}
                  />
                  <span className="opcion-texto">{opcion}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        {!mostrarResultados ? (
          <button className="btn-terminar" onClick={() => setMostrarResultados(true)}>
            Terminar examen
          </button>
        ) : (
          <div className="resultados">
            <h2>Resultados</h2>
            <p className="puntuacion">
              Tu puntuación: {calcularPuntuacion()} / {preguntas.length}
            </p>
            <button className="btn-descargar" onClick={generarPDF}>
              Descargar resultados en PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

