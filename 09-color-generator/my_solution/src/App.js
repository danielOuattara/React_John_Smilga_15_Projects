import React, { useState } from 'react';
import SingleColor from './SingleColor';

import Values from 'values.js';

function App() {

  const [ userColor, setUserColor ] = useState("");
  const [ error, setError ] = useState(null);
  const [ list, setList ] = useState(new Values('#fbb').all(10));

  const handleSubmit = (event) => {
    try {
      event.preventDefault();  
      setError(false)
      let allColors = new Values(userColor).all(10);
      setList(allColors)
      console.log(allColors);

    } catch (error) {
      console.log(error)
      setError(true);
      setUserColor("")     
    }
  }

  return (
    <> 
      <section className='container'>
        <h3> color generator </h3>
        <form onSubmit={handleSubmit}>
          <input
            type = "text" 
            value={userColor}
            placeholder="Enter valid Hex color..."
            onChange={ (event) => setUserColor(event.target.value)}
            className={error ? 'error': null }
          />
          <button type="submit" className='btn'>Submit</button> 
          {error && <p className='error'>Enter a valid Hexadecimal Color</p>}
        </form>
      </section>

      <section className='colors'>
        {list.map((color, index) => {
          console.log(color)
          return <SingleColor key={index} index={index} {...color} />
        })}
      </section>
    </>
  );
}

export default App;