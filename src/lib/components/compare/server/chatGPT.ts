
import { PRIVATE_OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { getTokens } from './tokenizer'





export const getResponse = (sysMessage) => {


}

export const replaceProductNameWithLinks = (chatResponse) => {



}







async function getChatGPTResponse(messages, systemMessage) {
    const reqMessages: ChatCompletionRequestMessage[] = messages

    if (!reqMessages) {
        throw new Error('no messages provided')
    }

    let tokenCount = 0

    reqMessages.forEach((msg) => {
        const tokens = getTokens(msg.content)
        tokenCount += tokens
    })

    const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            input: reqMessages[reqMessages.length - 1].content
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


    tokenCount += getTokens(systemMessage)

    if (tokenCount >= 4000) {
        throw new Error('Query too large')
    }



    const messagesFormated: ChatCompletionRequestMessage[] = [
        { role: ChatCompletionRequestMessageRoleEnum.System, content: systemMessage },
        ...reqMessages
    ]


    const chatRequestOpts: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: messagesFormated,
        temperature: 0.9,
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



