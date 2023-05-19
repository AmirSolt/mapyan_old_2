
import { PRIVATE_OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { getTokens } from './tokenizer'

import { ChatGPTInstructions, ChatGPTTemprature } from '$lib/utils/config'



export const getResponse = async (productInfos) => {


    const messages: ChatCompletionRequestMessage[] = [
        { role: ChatCompletionRequestMessageRoleEnum.System, content: ChatGPTInstructions },
        { role: ChatCompletionRequestMessageRoleEnum.User, content: JSON.stringify(productInfos)}
    ]

    const reponse = await getChatGPTResponse(messages)

    return reponse
}




async function getChatGPTResponse(messages) {
    

    if (!messages) {
        throw new Error('no messages provided')
    }

    let tokenCount = 0

    messages.forEach((msg) => {
        const tokens = getTokens(msg.content)
        tokenCount += tokens
    })

    if (tokenCount >= 4000) {
        throw new Error('Query too large')
    }



    // =================== Moderation =================== 
    const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            input: messages[messages.length - 1].content
        })
    })
    if (!moderationRes.ok) {
        const err = await moderationRes.json()
        throw new Error(err.error.message)
    }

    const moderationData = await moderationRes.json()
    const [results] = moderationData.results

    if (results.flagged) {
        throw new Error('Query flagged by openai')
    }



  


    // =================== Chat ===================

    const chatRequestOpts: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: ChatGPTTemprature,
    }

    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(chatRequestOpts)
    })




    if (!chatResponse.ok) {
        const err = await chatResponse.json()
        throw new Error(err.error.message)
    }

    const chunks = [];
    const reader = chatResponse.body.getReader();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    const responseText = new TextDecoder('utf-8').decode(
        new Uint8Array(Buffer.concat(chunks))
    );

    const jsonResponse = JSON.parse(responseText);

    if (jsonResponse.choices.length === 0)
        throw new Error("No response from AI")


    return jsonResponse.choices[0].message
}



