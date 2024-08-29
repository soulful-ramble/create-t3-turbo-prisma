import { useState } from "react"
import { Button } from "@acme/ui/button"
import { X } from "lucide-react"
import "~/global.css"
import { Input } from "@acme/ui/input"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 300,
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <Input onChange={(e) => {
        setData(e.target.value)
      }} value={data} />
      <footer>Crafted by @PlasmoHQ</footer>
      <Button variant="primary" onClick={
        () => {
          setData("")
        }
      }>Click me! <X /></Button>
    </div>
  )
}

export default IndexPopup
