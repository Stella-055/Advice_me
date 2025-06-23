import { useState, useEffect } from "react";
import { RiseLoader } from "react-spinners";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        setAdvice(data.slip.advice);
      } catch (error) {
        setAdvice("");

        setError("Error fetching advice");
      }
    };
    fetchAdvice();
  }, []);

  return (
    <>
      <div>
        <button
          onClick={async () => {
            setAdvice("");
            setError(null);
            setLoading(true);
            try {
              const response = await fetch("https://api.adviceslip.com/advice");
              const data = await response.json();
              setAdvice(data.slip.advice);
            } catch (error) {
              setAdvice("");
              setError("Error fetching advice");
              console.error("Error fetching advice:", error);
            } finally {
              setLoading(false);
            }
          }}
        >
          Get random advice
        </button>
        {loading && (
          <RiseLoader
            loading={loading}
            color="black"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {error && <p>{error}</p>}

        <p>{advice}</p>
      </div>
    </>
  );
}

export default App;
