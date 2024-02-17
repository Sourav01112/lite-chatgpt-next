import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
    runtime: "edge",
};

export default async function handler(req) {
    try {
        const { message } = await req.json();
        const stream = await OpenAIEdgeStream(
            "https://api.openai.com/v1/chat/completions",
            {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${process.env.OPEN_AI_KEy}`
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: message }],
                    stream: true
                })
            },
        );
        // console.log("streammmmmm>>>", stream)
        return new Response(stream)
    } catch (error) {
        console.log("error occurred in handler Send Message:", error);
    }
}
