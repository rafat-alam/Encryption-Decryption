# 🔐 API for Encryption and Decryption of Text Data

This API provides simple endpoints to **encrypt** and **decrypt** text data using a secure 48-digit code.

---

## 🔒 Request Format for Encryption

- **Method:** `POST`  
- **Endpoint:** `/encrypt`

### 📤 JSON Body Format

```json
{
  "msg": "Message you want to encrypt",
  "code": "123456789012345678901234567890123456789012345678"
} 
```

## 🔓 Request Format for Decryption

- **Method:** `POST`  
- **Endpoint:** `/decrypt`

### 📤 JSON Body Format

```json
{
  "emsg": "MessageYouWantToDecrypt",
  "code": "123456789012345678901234567890123456789012345678"
}
```
