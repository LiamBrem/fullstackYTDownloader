function downloadVideo() {
  var url = document.getElementById("urlInput").value;
  if (!url) {
    alert("Please enter a YouTube URL");
    return;
  }

  fetch("/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "url=" + encodeURIComponent(url),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else if (data.file_path) {
        var outputDiv = document.getElementById("output");
        outputDiv.innerHTML =
          'Video downloaded successfully. <a href="' +
          data.file_path +
          '">Download here</a>';
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
