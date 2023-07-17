import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import copyText from "copy-to-clipboard";

function App() {
  const [result, setResult] = useState("");
  const [link, setLink] = useState("");
  const [rightUrl, setRightUrl] = useState(false);
  const location = useLocation();
  const ref = useRef();

  const getData = async (id) => {
    const res = await fetch(`/api/index.php?id=${id}`).then((r) => r.json());
    window.location.href = res === 401 ? "" : res;
  };

  const sendData = (data) => {
    fetch("/api/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  };

  const getURL = () => {
    const link = ref.current.value;
    setLink(link);
    if (
      (link,
      link.search(/\./) > 8 &&
        (link.search("http://") >= 0 || link.search("https://") >= 0))
    ) {
      const id = (Math.random() + 1).toString(36).substring(7);
      const url = window.location.origin + "/#" + id;
      setResult(url);
      setRightUrl(true);
      sendData({ id, link });
      ref.current.value = "";
    } else {
      setResult("Enter rigth URL");
      setRightUrl(false);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/") getData(location.pathname.replace("/", ""));
  }, [location]);

  return (
    <div className="app">
      <div>
        <span>URL: </span>
        <input
          ref={ref}
          type="text"
          name="link"
          onKeyDown={(e) => e.key === "Enter" && getURL()}
        />
        <button onClick={getURL}>Get</button>
      </div>
      {link && (
        <div onClick={() => copyText(result)}>
          <h3 className={rightUrl ? "" : "red"}>{result}</h3>
          {rightUrl && <button className="copyButton">Copy</button>}
        </div>
      )}
    </div>
  );
}

export default App;
