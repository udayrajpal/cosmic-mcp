document.getElementById("oracleForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value;

  const loading = document.getElementById("loading");
  const result = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  result.classList.add("hidden");
  errorDiv.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dob })
    });

    const data = await res.json();

    loading.classList.add("hidden");

    if (!res.ok) {
      errorDiv.textContent = data.error || "Something went wrong.";
      errorDiv.classList.remove("hidden");
      return;
    }

    // Fill results
    document.getElementById("mc").textContent = data.mysticalCompliment || "";
    document.getElementById("sp").textContent = data.superpower || "";
    document.getElementById("tp").textContent = data.thoughtProcess || "";
    document.getElementById("em").textContent = data.emotions || "";
    document.getElementById("pr").textContent = data.preferredRoles || "";
    document.getElementById("ch").textContent = data.challenges || "";
    document.getElementById("ad").textContent = data.advice || "";

    result.classList.remove("hidden");
  } catch (err) {
    loading.classList.add("hidden");
    errorDiv.textContent = "Network or server error.";
    errorDiv.classList.remove("hidden");
    console.error(err);
  }
});
