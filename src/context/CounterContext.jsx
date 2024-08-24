import { createContext , useState } from "react"

export let CounterContext = createContext(0)

export default function CounterContextProvider(props) {

  const [counter, setCouneter] = useState(0)
  function changeCounter() {
    setCouneter(Math.random)
  }

  return (
        <CounterContext.Provider value={{counter ,changeCounter}}>
          {props.children}
        </CounterContext.Provider>
  )
}
