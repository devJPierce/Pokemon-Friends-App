import React, {useState, useEffect} from 'react'



const Counter = (item) => {

    const [count, setCount] = useState(0)

    useEffect(() => {

        if (localStorage.getItem(item.name)) {
            setCount(parseInt(localStorage.getItem(item.name)))
        }
    }, [])

    const handleCount = () => {
        setCount(count + 1)
    }


  return (
    <>
        
        <br></br>
        <button onClick={handleCount} style={{border: 'solid white'}}>Like</button>
        <br></br>
        
        <div>{count}</div>
        <br></br>
    </>
  )
}

export default Counter