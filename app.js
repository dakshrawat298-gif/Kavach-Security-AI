// app.js - The Brain of Kavach.ai

document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scanBtn');
    const statusText = document.getElementById('statusText');
    const container = document.querySelector('.relative.z-10'); // The glass panel

    let isScanning = false;

    scanBtn.addEventListener('click', () => {
        if (isScanning) return; // Prevent multiple clicks
        
        isScanning = true;
        
        // UI Changes for Scanning State
        scanBtn.classList.add('scale-95');
        container.classList.add('scanning-active');
        statusText.innerHTML = '<span class="text-blue-400 animate-pulse">Initializing Bhashini AI Agents...</span>';
        statusText.classList.replace('text-gray-400', 'text-blue-400');

        // Simulate AI Fraud Detection (Mock Delay)
        setTimeout(() => {
            statusText.innerHTML = '<span class="text-emerald-400 font-bold tracking-wide">Analyzing Network Packets...</span>';
        }, 1500);

        setTimeout(() => {
            statusText.innerHTML = '<span class="text-emerald-400 font-bold tracking-wide">Checking UPI Vectors...</span>';
        }, 3000);

        setTimeout(() => {
            // End Scan Simulation
            scanBtn.classList.remove('scale-95');
            container.classList.remove('scanning-active');
            
            // Show Secure Status
            statusText.innerHTML = '<span class="text-emerald-500 font-bold">✓ System Secure. No threats detected.</span>';
            
            // Reset after 3 seconds
            setTimeout(() => {
                isScanning = false;
                statusText.innerHTML = 'System idle. Tap to secure.';
                statusText.className = 'mt-10 text-gray-400 text-sm h-5 transition-all duration-300';
            }, 3000);
            
        }, 4500);
    });
});