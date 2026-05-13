from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import time

app = FastAPI(title="Kavach.ai Core Logic")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    packet_data: str

@app.post("/scan")
async def process_scan(request: ScanRequest):
    start_time = time.time()
    
    safe_data = request.packet_data.replace("Aadhaar", "[REDACTED]")
    
    is_fraud = "free-money" in request.packet_data.lower() or "phishing" in request.packet_data.lower()
    regional_alert = "Bhai, yeh link fraud hai, ispar click mat karo." if is_fraud else "Network packet safe hai."
    
    processing_time = round((time.time() - start_time) * 1000, 2)

    return {
        "status": "success",
        "fraud_detected": is_fraud,
        "alert_message_hindi": regional_alert,
        "latency_ms": processing_time
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)