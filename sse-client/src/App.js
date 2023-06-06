import React from 'react';

export function Subscriptions() {
  const targetRef = React.useRef(null);
  const [randomId] = React.useState(Math.random().toString(36).substring(7));
  React.useEffect(() => {
    const es = new EventSource(`http://localhost:3000/events?id=${randomId}`, {
      withCredentials: true,
    });
    es.onopen = () => {
      console.log('open');
    };
    es.onmessage = (e) => {
      console.log(e);
    };
    es.onerror = (e) => {
      console.log(e);
    };
    es.addEventListener('data', (e) => {
      console.log(e);
    });
    // @ts-ignore
    targetRef.current = es;
  }, []);

  // unmount
  React.useEffect(() => {
    return () => {
      console.log(targetRef.current);
      targetRef.current?.close();
    };
  }, []);

  return <p>Current Id: {randomId}</p>;
}

export default function Home() {
  const [flag, setFlag] = React.useState(false);

  return (
    <div>
      <main>
        <p>Check F12 Developer Console</p>

        <button onClick={() => setFlag((prev) => !prev)}>
          Toggle {flag ? 'true' : 'false'}
        </button>
        {flag && <Subscriptions />}
      </main>
    </div>
  );
}
