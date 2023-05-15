import React, { useState, useEffect } from 'react';

const Singlebox = function (props) {
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    const { socket } = props;

    // Emit the initial button state
    socket.emit('buttonState', buttonState);

    // Listen for updates to the button state
    socket.on('buttonState', (state) => {
      console.log('updated state', state);
      setButtonState(state);
    });

    // Cleanup function
    return () => {
      // Unsubscribe from the 'buttonState' event
      socket.off('buttonState');
    };
  }, [props.socket]);

  const handleToggle = () => {
    const { socket } = props;
    const newState = !buttonState;

    // Update the button state locally
    setButtonState(newState);

    // Emit the new button state
    socket.emit('buttonState', newState);
  };

  return (
    <div className='devices'>
      <div className='box'>
        <p>{props.name}</p>
        <img src={props.image} alt='light' />
        <i
          className='fas fa-lightbulb-on light'
          id = {props.idname}
          style={{ width: '25px', height: '25px', color: '#3976f6' }}
        ></i>
        <label className='switch'>
          <input type='checkbox' checked={buttonState} onChange={handleToggle} />
          <span className='slider round'></span>
        </label>
      </div>
    </div>
  );
};

export default Singlebox;
