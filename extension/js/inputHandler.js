const input = document.querySelector("input");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    input.style.color = "#ffffff80";
    document.querySelector("#loading").style.display = "flex";
    chrome.tabs.query({ active: true }, function (tabs) {
      var tab = tabs[0];

      chrome.scripting.executeScript(
        {
          target: {
            tabId: tab.id,
          },
          function: () => {
            return document.body.innerText;
          },
        },
        (results) => {
          const xhr = new XMLHttpRequest();

          xhr.open("POST", "http://localhost:7074/response/respond", true);

          const body = JSON.stringify({
            question: input.value,
            content: results[0].result,
          });

          xhr.send(body);

          xhr.onload = function () {
            input.value = "";
            input.style.color = "#fff";
            document.querySelector("#loading").style.display = "none";
            const container = document.getElementById("content");
            let newDiv = document.createElement("div");
            let newP = document.createElement("p");
            newP.classList.add("ai-message-text");
            newDiv.classList.add("ai-message");
            newP.innerText = this.responseText;
            newDiv.appendChild(newP);
            container.appendChild(newDiv);

            setTimeout(() => {
              container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
              });
            }, 200);
          };
        }
      );
    });
  }
});
