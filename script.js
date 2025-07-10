document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert("Please upload a script file.");

  const reader = new FileReader();
  reader.onload = function () {
    let content = reader.result;

    // Apply options
    if (document.getElementById('antiTamper').checked) {
      content = '-- AntiTamper Enabled\n' + content;
    }
    if (document.getElementById('antiLeak').checked) {
      content = '-- AntiLeak Enabled\n' + content;
    }
    if (document.getElementById('antiClown').checked) {
      content = '-- AntiClown Mode Activated\n' + content;
    }
    if (document.getElementById('padding').checked) {
      const padding = "-- DUMMY DATA\n".repeat(4000); // ~80KB
      content += "\n" + padding;
    }

    // Fake obfuscation
    let encoded = btoa(unescape(encodeURIComponent(content)));
    let output = 'loadstring(game:HttpGet(("data:text/plain;base64,' + encoded + '"), true))()';

    document.getElementById('output').value = output;
    document.getElementById('downloadBtn').style.display = 'inline-block';

    document.getElementById('downloadBtn').onclick = () => {
      const blob = new Blob([output], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'obfuscated.lua';
      link.click();
    };
  };
  reader.readAsText(file);
});