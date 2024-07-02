import ForgeReconciler, { Text, Button } from '@forge/react';
import React, { useState } from 'react';

const Charity = () => {
  const [clicked, setClicked] = useState(false)

  const newComponent = () => {
    setClicked(true)
  }


  return (
    <>
      <Text>Bye world!</Text> 
      {clicked
        ? <>
        {setClicked(false)}
        <App />
        </>
        :<Text>Same page</Text>  
      }
      <Button onClick={newComponent}>go to home</Button>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Charity />
  </React.StrictMode>
);

export default events;