#include <WiFi.h>
#include <HTTPClient.h>

#define MQ2_PIN 34
#define GREEN_PIN 18
#define RED_PIN 19
#define BUZZER_PIN 23

const char* ssid = "Groot";
const char* password = "hurufbesarsemua";

void setup() {
  Serial.begin(115200);
  Serial.println();
  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  pinMode(MQ2_PIN, INPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(RED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  int sensorValue = analogRead(MQ2_PIN);

  if (sensorValue > 500) {
    digitalWrite(GREEN_PIN, LOW);
    digitalWrite(RED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, LOW);
  } else {
    digitalWrite(GREEN_PIN, HIGH);
    digitalWrite(RED_PIN, LOW);
    digitalWrite(BUZZER_PIN, HIGH);
  }

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    Serial.print("[HTTP] begin..\n");
    String urlsend = "http://192.168.43.77/proguas/script.php?sensorValue=" + (String)sensorValue;
    Serial.print("URL to send: " + urlsend);
    http.begin(urlsend);

    Serial.print("[HTTP] GET...\n");
    int httpCode = http.GET();
    if (httpCode >= 200 && 299) {
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
      if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println(payload);
      }
    } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  }
  delay(2000);
}
