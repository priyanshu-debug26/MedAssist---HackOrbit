const joinBtn = document.getElementById("joinBtn");
const videoContainer = document.getElementById("videoContainer");
const main5 = document.querySelector(".main5");

joinBtn.onclick = () => {
  // Expand the main5 section
  main5.classList.add("expanded");

  // Expand the video container
  videoContainer.classList.add("expanded");

  // Generate unique room name
  const roomName = `myroom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const url = `https://meet.jit.si/${roomName}`;

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.allow = "camera; microphone; fullscreen; speaker";
  iframe.style.border = "0";

  // Create End Call button
  const endBtn = document.createElement("button");
  endBtn.textContent = "End Call";
  endBtn.style.marginTop = "1rem";
  endBtn.style.background = "#e74c3c";
  endBtn.style.color = "#fff";
  endBtn.style.border = "none";
  endBtn.style.borderRadius = "8px";
  endBtn.style.padding = "10px 24px";
  endBtn.style.fontSize = "18px";
  endBtn.style.cursor = "pointer";

  endBtn.onclick = () => {
    // Remove iframe and shrink containers
    videoContainer.innerHTML = "";
    main5.classList.remove("expanded");
    videoContainer.classList.remove("expanded");
  };

  // Show iframe and End Call button
  videoContainer.innerHTML = "";
  videoContainer.appendChild(iframe);
  videoContainer.appendChild(endBtn);
};