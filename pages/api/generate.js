import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Help me reply back to the following sentence in more than 20 words in a funny and very cool way in 4 different ways.

Sentence: 
`;
const generateAction = async (req, res) => {
  // Run first prompt
  //console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    //////////////////////////////////////////////////////check below line and add basepromtprefix
    prompt: `${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // const secondPrompt = 
  // `
  // Take the four sentences given below and reply to each of those sentences in a funny and very cool way,
  // Four sentences: ${basePromptOutput.text}.

  // `
  // const secondPromptCompletion = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt: `${secondPrompt}`,
  //   temperature: 0.7,
  //   max_tokens: 250
  // });

  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json(
    { 
      output1: basePromptOutput.text,
      //output2: secondPromptOutput.text
    });
};

export default generateAction;