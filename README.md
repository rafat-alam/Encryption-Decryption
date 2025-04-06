# 🔐 API for Encryption and Decryption of Text Data

This API provides simple endpoints to **encrypt** and **decrypt** text data using a secure 64-digit code.

---

## 🔒 Request Format for Encryption

- **Method:** `POST`  
- **Endpoint:** `/encrypt`

### 📤 JSON Body Format

```json
{
  "msg": "Message you want to encrypt",
  "code": "7439152083647195820364719582036471958203647195820364719582036471958"
} 
```

## 🔓 Request Format for Decryption

- **Method:** `POST`  
- **Endpoint:** `/decrypt`

### 📤 JSON Body Format

```json
{
  "emsg": "MessageYouWantToDecrypt",
  "code": "7439152083647195820364719582036471958203647195820364719582036471958"
}
```
