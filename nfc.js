// nfc.js 文件

// 获取按钮和显示内容的元素
const readNfcButton = document.getElementById("readNfcButton");
const clearContentButton = document.getElementById("clearContentButton");
const nfcContent = document.getElementById("nfcContent");

// 检查浏览器是否支持Web NFC
if (!("NDEFReader" in window)) {
  nfcContent.textContent = "抱歉，您的浏览器不支持Web NFC功能。";
  readNfcButton.disabled = true;
} else {
  // 点击按钮时读取NFC内容
  readNfcButton.addEventListener("click", async () => {
    try {
      nfcContent.textContent = "请靠近卡片";
      const ndef = new NDEFReader();
      await ndef.scan();
      ndef.onreading = (event) => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          nfcContent.textContent = `读取到的NFC内容: ${decoder.decode(
            record.data
          )}`;
          window.location.href = "my story/index.html"
        }
      };
    } catch (error) {
      nfcContent.textContent = `读取NFC失败: ${error}`;
    }
  });
}

// 点击清除按钮时清除NFC内容
clearContentButton.addEventListener("click", () => {
  nfcContent.textContent = "";
});

// 获取按钮元素
let button = document.getElementById("btn");
// 保存安装提示事件
let savedPrompt;
window.addEventListener("beforeinstallprompt", function (e) {
  // 阻止默认提示弹出
  e.preventDefault();
  // 把事件存起来
  savedPrompt = e;
  // 显示按钮
  button.classList.remove("disabled");
});
button.addEventListener("click", function () {
  // 隐藏按钮
  button.classList.add("disabled");
  // 触发安装提示展现
  savedPrompt.prompt();
  // 用户行为判断
  savedPrompt.userChoice.then(function (result) {
    // 用户操作之后清空事件
    savedPrompt = null;
    if (result.outcome === "accept") {
      // 用户将站点添加到桌面
    } else {
      // 用户取消操作
    }
  });
});
