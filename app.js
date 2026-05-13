// app.js - Connected to Python Backend
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
            // Python Backend ko request bhejna
            const response = await fetch('http://127.0.0.1:8000/scan', {
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
            } else {
                statusText.innerHTML = `<span class="text-emerald-500 font-bold">✅ Network Safe.</span>`;
            }

        } catch (error) {
            console.error("Backend offline:", error);
            statusText.innerHTML = '<span class="text-red-500">Error: Cannot connect to Kavach.ai Core. Server chalu kar bhai.</span>';
        } finally {
            // UI Reset
            container.classList.remove('scanning-active');
            setTimeout(() => {
                scanBtn.disabled = false;
                statusText.innerHTML = '<span class="text-gray-400 text-sm">System idle. Tap to secure.</span>';
            }, 5000);
        }
    });
});