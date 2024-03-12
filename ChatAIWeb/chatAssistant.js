const apiUrl = "https://api.openai.com/v1/chat/completions";

/**
 * sendMessage
 * @param {*} message
 * @return {*}
 */
async function sendMessage(message) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

document.addEventListener("DOMContentLoaded", () => {
    const messageForm = document.getElementById("message-form");
    const messageInput = document.getElementById("message-input");
    const chatbox = document.getElementById("chatbox");

    messageForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const message = messageInput.value;
        messageInput.value = "";

        const divMessageElement = document.createElement("div");
        divMessageElement.innerHTML = "User:<br>";
        const messageElement = document.createElement("textarea");

        messageElement.innerHTML = message;
        divMessageElement.appendChild(messageElement);
        chatbox.appendChild(divMessageElement);

        const divResponseElement = document.createElement("div");
        divResponseElement.innerHTML = "Assistant:<br>";

        const responseElement = document.createElement("textarea");
        divResponseElement.appendChild(responseElement);
        chatbox.appendChild(divResponseElement);

        const hrElement = document.createElement("hr");
        chatbox.appendChild(hrElement);

        responseElement.placeholder = "受信中...";
        const response = await sendMessage(message);
        responseElement.innerHTML = response;
    });
});
