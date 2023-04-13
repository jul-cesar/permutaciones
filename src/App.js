import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [num, setNum] = useState("");
  const [render, setRender] = useState([]);

  function posiblesPermus(num) {
    const numeros = num.toString().split("");
    let resul = new Set();

    const cambiar = (a, b) => {
      const first = numeros[a];
      numeros[a] = numeros[b];
      numeros[b] = first;
    };

    function generar(n) {
      if (n === 1) {
        resul.add(parseInt(numeros.join("")));
      } else {
        for (let i = 0; i < n; i++) {
          generar(n - 1);
          cambiar(n % 2 ?  0 : i, n - 1);
        }
      }
    }

    generar(numeros.length);
    return [...resul];
  }

  function submitForm(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const resul = posiblesPermus(num);
    const hasNaN = resul.some((e) => isNaN(e));
    setRender(
      hasNaN ? (
        <p>Ingresa numeros!</p>
      ) : (
        resul.map((e) => {
          return <p>{e}</p>;
        })
      )
    );
  }, [num]);

  return (
    <div className="App">
      <form className="resultado" onSubmit={submitForm}>
        <label htmlFor="valor">Ingresa un numero: </label>
        <input
          required
          type="text"
          minlength="3"
          maxlength="3"
          name="valor"
          onChange={(e) => setNum(e.target.value)}
        ></input>
      </form>

      <div className="resultado">{render}</div>
    </div>
  );
}

export default App;
