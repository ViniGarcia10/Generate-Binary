import { useState } from "react";
import "./App.css";

interface ListNumbers {
  listNumbers?: number[];
  qntZero?: number;
  qntOne?: number;
}

function App() {
  const [numbers, setNumbers] = useState<ListNumbers>({});
  const [isActiveGenerate, setIsActiveGenerate] = useState<boolean>(false);
  const [isActiveView, setIsActiveView] = useState<boolean>(false);

  function handleGenerateNumbers() {
    setIsActiveView(false);

    let listNumbers: number[] = [];
    let qntZero: number = 0;
    let qntOne: number = 0;

    for (let index = 0; index < 100; index++) {
      listNumbers.push(Math.floor(Math.random() * 2));

      if (listNumbers[index] == 0) {
        qntZero++;
      } else {
        qntOne++;
      }
    }

    setIsActiveGenerate(true);

    setNumbers({ listNumbers, qntZero, qntOne });

    alert("Números Gerados com sucesso!");
  }

  function handleLimparNumbers() {
    setNumbers({ listNumbers: [], qntZero: 0, qntOne: 0 });
    setIsActiveView(false);
    setIsActiveGenerate(false);
  }

  function handleVisibleVisor() {
    setIsActiveView(true);
  }

  return (
    <div className="App">
      <h1>Gerador de Números</h1>

      <div className="visor">
        <div>
          <p>Números</p>
          {(!!numbers?.listNumbers?.length && isActiveView && (
            <textarea
              cols={30}
              rows={5}
              readOnly
              wrap="hard"
              value={JSON.stringify(numbers?.listNumbers?.join(""))}
            ></textarea>
          )) || (
            <div id="container-mentaliza">
              <h2>{!!numbers?.listNumbers?.length && 'Mentaliza...' || '---'}</h2>
            </div>
          )}
        </div>

        {isActiveView && (
          <div>
            <p>
              <b>{String(numbers.qntZero)+"%"}</b> de números 0
            </p>
            <p>
              <b>{String(numbers.qntOne)+"%"}</b> de números 1
            </p>
          </div>
        )}
      </div>

      <div className="contain-buttons">
        <button
          disabled={isActiveGenerate}
          type="button"
          onClick={handleGenerateNumbers}
        >
          Gerar
        </button>
        {!!numbers?.listNumbers?.length && (
          <button
            type="button"
            onClick={handleVisibleVisor}
            disabled={isActiveView}
          >
            Mostrar
          </button>
        )}

        <button type="reset" onClick={handleLimparNumbers}>
          Limpar
        </button>
      </div>
    </div>
  );
}

export default App;
