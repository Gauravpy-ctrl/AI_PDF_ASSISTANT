async function askAI() {
  const input = document.getElementById("question");
  const chatbox = document.getElementById("chatbox");
  const question = input.value.trim();

  if (!question) return;

  chatbox.innerHTML += `<div class="message user">${question}</div>`;
  input.value = "";

  chatbox.innerHTML += `<div class="message ai" id="loading">Thinking...</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;

  try {
    const response = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: question })
    });

    const data = await response.json();

    document.getElementById("loading").remove();
    chatbox.innerHTML += `<div class="message ai">${data.answer}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  } catch (error) {
    document.getElementById("loading").remove();
    chatbox.innerHTML += `<div class="message ai">Error connecting to backend.</div>`;
  }
}