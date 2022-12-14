import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import shajithLogo from '../assets/shajith-logo.png';

import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    //console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output1,output2 } = data;
    //console.log("OpenAI replied...", output1.text);
    //console.log("OpenAI replied...", output2.text);

    setApiOutput(data);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace | How to Respond?</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>How to respond?</h1>
          </div>
          <div className="header-subtitle">
            <h2>Are you confused on what to respond back in text or calls? Here is a tool that can help</h2>
          </div>
        </div>
      </div>
        <div className="prompt-container">
          <textarea placeholder="start typing here" className="prompt-box" value={userInput} onChange={onUserChangedText}/>
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Replies</h3>
                </div>
              </div>
              <div className="output-content-full">
                <div className="output-content">
                  <p>{apiOutput.output1}</p>
                </div>
              </div>
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Replies to replies</h3>
                </div>
              </div>
              <div className="output-content-full">
                <div className="output-content">
                  <p>{apiOutput.output2}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
      <div className="badge-container-2 grow">
        <a
          // href="https://portfolio.shajith.co.in"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={shajithLogo} alt="Shajith Avatar" />
            <p>Made with 💘 by Shajith</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
