import { useEffect, useState } from 'react';

const TimerTest = () => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setTimer(timer + 1);
    }, 1000);
  }, [timer]);

  return (
    <>{timer}</>
  );
};

export default TimerTest;