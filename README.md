# 🔐 API for Encryption and Decryption of Text Data

This API provides simple endpoints to **encrypt** and **decrypt** text data using a secure 64-digit code.

---

## 🚀 Server Setup

Follow these steps to set up and test the server:

### 1. Install Dependencies

```bash
/GitHub/Encryption-Decryption (main)
$ npm install
```

### 2. Running Server

```bash
/GitHub/Encryption-Decryption (main)
$ npm run test
```

## 🔒 Request Format for Encryption

- **Method:** `POST`  
- **Endpoint:** `/encrypt`

You may also use the URL-encoded form of this request.

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

You may also use the URL-encoded form of this request.

### 📤 JSON Body Format

```json
{
  "emsg": "MessageYouWantToDecrypt",
  "code": "7439152083647195820364719582036471958203647195820364719582036471958"
}
```
