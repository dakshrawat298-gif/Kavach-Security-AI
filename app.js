// app.js - Connected to Python Backend (Final Cloud Version)
document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scanBtn');
    const statusText = document.getElementById('statusText');
    const container = document.querySelector('.relative.z-10'); 

    scanBtn.addEventListener('click', async () => {
        // UI ko scanning state mein daalna
        statusText.innerHTML = '<span class="text-blue-400 animate-pulse">Analyzing Network Packets via FastAPI...</span>';
        container.classList.add('scanning-active');
        scanBtn.disabled = true;

        try {
            // Naya Cloud API Call (Tera Codespace Public URL)
            const response = await fetch('https://symmetrical-space-happiness-r49g7xpr6jmqfxw5j-8000.app.github.dev/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    packet_data: "Incoming SMS: Click here for free-money and update Aadhaar" 
                })
            });

            const data = await response.json();

            // AI ka Result show karna
            if (data.fraud_detected) {
                statusText.innerHTML = `<span class="text-red-500 font-bold">ߚ FRAUD DETECTED! Alert: ${data.alert_message_hindi}</span>`;
                container.style.borderColor = "#ef4444"; // Red line for danger
            } else {
                statusText.innerHTML = `<span class="text-emerald-500 font-bold">✅ Network Safe.</span>`;
                container.style.borderColor = "#10b981"; // Green line for safe
            }

        } catch (error) {
            console.error("Backend offline:", error);
            statusText.innerHTML = '<span class="text-red-500">Error: Cannot connect to Kavach.ai Core.</span>';
        } finally {
            // UI Reset
            container.classList.remove('scanning-active');
            setTimeout(() => {
                scanBtn.disabled = false;
                statusText.innerHTML = '<span class="text-gray-400 text-sm">System idle. Tap to secure.</span>';
                container.style.borderColor = "rgba(255,255,255,0.1)"; // Reset border
            }, 5000);
        }
    });
});