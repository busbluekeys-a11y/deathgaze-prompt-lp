const copyButton = document.querySelector("[data-copy-target]");
const copyStatus = document.querySelector(".copy-status");

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some browsers block Clipboard API despite a secure context.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("copy failed");
}

copyButton?.addEventListener("click", async () => {
  const target = document.getElementById(copyButton.dataset.copyTarget);
  if (!target) return;

  const label = copyButton.querySelector(".copy-label");
  try {
    await copyText(target.textContent.trim());
    label.textContent = "コピーしました";
    copyStatus.textContent = "画像生成AIへ、そのまま貼り付けてください。";
    copyButton.classList.add("is-copied");
  } catch {
    label.textContent = "コピーできませんでした";
    copyStatus.textContent = "コード欄を選択して手動でコピーしてください。";
  }

  window.setTimeout(() => {
    label.textContent = "プロンプト全文をコピー";
    copyButton.classList.remove("is-copied");
  }, 2600);
});
