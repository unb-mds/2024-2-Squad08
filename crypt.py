from cryptography.fernet import Fernet

# Generate a key for encryption
def generate_key():
    return Fernet.generate_key()

# Encrypt a message
def encrypt_message(message, key):
    fernet = Fernet(key)
    encrypted_message = fernet.encrypt(message.encode())
    return encrypted_message

# Decrypt a message
def decrypt_message(encrypted_message, key):
    fernet = Fernet(key)
    decrypted_message = fernet.decrypt(encrypted_message).decode()
    return decrypted_message

if __name__ == "__main__":
    key = generate_key()
    print(f"Key: {key.decode()}")

    message = "This is a secret message"
    encrypted_message = encrypt_message(message, key)
    print(f"Encrypted: {encrypted_message}")

    decrypted_message = decrypt_message(encrypted_message, key)
    print(f"Decrypted: {decrypted_message}")