import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function PlaygroundPage() {
  return (
    <Layout
      title="Interactive Playground"
      description="Try unblessed widgets live in your browser with Monaco Editor and XTerm.js"
      noFooter={true}>
      <BrowserOnly fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading playground...</div>}>
        {() => {
          // Dynamic import to ensure it only runs in browser
          const Playground = require('../components/Playground').default;
          return <Playground />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
