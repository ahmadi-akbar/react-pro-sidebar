import dynamic from 'next/dynamic';
import Head from 'next/head';

const PlaygroundClient = dynamic(() => import('../components/PlaygroundClient'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        opacity: 0.6,
      }}
    >
      Loading playground…
    </div>
  ),
});

export default function PlaygroundPage() {
  return (
    <>
      <Head>
        <title>Interactive Playground – React Pro Sidebar</title>
        <meta
          name="description"
          content="Try React Pro Sidebar in real time with the interactive playground."
        />
      </Head>
      <PlaygroundClient />
    </>
  );
}
