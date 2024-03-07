import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numallow, setNumallow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook to copy 
  const passref=useRef(null);

  const passwordGene = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numallow) str += "0123456789"

    if (charallow) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);//it will give index of character
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [length, numallow, charallow]);

  const copypass= useCallback(()=>{
    passref.current?.select()          //for giving effect to selected part like highlight etc
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(() => { passwordGene() }, [length, numallow, charallow, passwordGene]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-orange-500 bg-gray-800">

        <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3 rounded-md mx-2" placeholder='Password' readOnly ref={passref}/>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={copypass}>Copy</button>
        </div>

        <div className="flex text-sm gap-x-2 items-center">
          <div className="flex item-center gap-x-2">
            <input type="range" min={6} max={12} value={length} className="cursor-pointer mx-2" onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
          </div>

          <div className="flex item-center gap-x-2">
            <input type="checkbox" defaultChecked={numallow} id="numberInput" onChange={() => { setNumallow((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex item-center gap-x-2">
            <input type="checkbox" defaultChecked={charallow} id="charInput" onChange={() => { setCharallow((prev) => !prev) }} />
            <label htmlFor="charInput">Characters</label>
          </div>

          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg ml-3" onClick={()=>{passwordGene()}}>New</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
