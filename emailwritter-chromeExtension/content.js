console.log("Email writter extension and the email generator extension");
function createAiBtn() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI  Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI reply");
  return button;
}
function getEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
    return "";
  }
}
function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];
  console.log(selectors);
  for (const selector of selectors) {
  console.log(selector);

    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
    return null;
  }
}

function injectButton() {
  const existingbtn = document.querySelector("ai-reply-button");
  if (existingbtn) {
    existingbtn.remove();
  }
  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("toolbar not found");
    return;
  }
  console.log("toolbar found");
  const button = createAiBtn();
  button.classList.add("ai-reply-button");
  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;
      const emailcontent = getEmailContent();
      const response=await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailcontent: emailcontent,
          tone: "professional",
        }),
      });
      if (!response.ok) {
        throw new Error('Api request failed');
      }
      const generatedRepy=await response.text();
      const Composebox=document.querySelector('[role="textbox"][g_editable="true"]');
      if(Composebox){
        Composebox.focus();
        document.execCommand('insertText',false,generatedRepy);
      }else{
        console.error("compose box not found");
      }
    } catch (error) {
        console.error(error);
        alert("Failed to generate reply");

    }finally{
  button.innerHTML = "AI  Reply";
        button.disabled=false;
    }
  });
  toolbar.insertBefore(button, toolbar.firstChild);
}
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh,.btC,[role="dialog"]') ||
          node.querySelector('.aDh,.btC,[role="dialog"]'))
    );
    if (hasComposeElements) {
      console.log("compose window detected");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
