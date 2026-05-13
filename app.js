// app.js - Connected to Python Backend (Final Version)
document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scanBtn');
    const statusText = document.getElementById('statusText');
    const container = document.querySelector('.relative.z-10'); 

    scanBtn.addEventListener('click', async () => {
        // UI Scanning State
        statusText.innerHTML = '<span class="text-blue-400 animate-pulse">Analyzing Network Packets via FastAPI...</span>';
        container.classList.add('scanning-active');
        scanBtn.disabled = true;

        try {
            // Naya Cloud API Call - Check url has /scan at the end
            const response = await fetch('https://symmetrical-space-happiness-r49g7xpr6jmqfxw5j-8000.app.github.dev/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packet_data: "Incoming SMS: Click here for free-money and update Aadhaar" })
            });

            if (!response.ok) throw new Error("Network issue or Port not public");

            const data = await response.json();

            // Result Alert
            if (data.fraud_detected) {
                statusText.innerHTML = `<span class="text-red-500 font-bold">ߚ FRAUD DETECTED! Alert: ${data.alert_message_hindi}</span>`;
                container.style.borderColor = "#ef4444"; 
            } else {
                statusText.innerHTML = `<span class="text-emerald-500 font-bold">✅ Network Safe.</span>`;
                container.style.borderColor = "#10b981"; 
            }

        } catch (error) {
            console.error("Backend offline:", error);
            statusText.innerHTML = '<span class="text-red-500 font-bold">Error: Cannot connect. Bhai PORT 8000 Public check kar!</span>';
        } finally {
            container.classList.remove('scanning-active');
            setTimeout(() => {
                scanBtn.disabled = false;
                statusText.innerHTML = '<span class="text-gray-400 text-sm">System idle. Tap to secure.</span>';
                container.style.borderColor = "rgba(255,255,255,0.1)"; 
            }, 5000);
        }
    });
});