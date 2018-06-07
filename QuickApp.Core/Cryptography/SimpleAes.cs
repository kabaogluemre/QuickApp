using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace QuickApp.Core.Cryptography
{
    public class SimpleAes
    {
        public string Encrypt(string plainText, string key)
        {
            using (var aes = new RijndaelManaged { Padding = PaddingMode.PKCS7, BlockSize = 128, Mode = CipherMode.ECB, Key = Encoding.ASCII.GetBytes(key) })
            {
                using (var encryptor = aes.CreateEncryptor())
                {
                    using (var mem = new MemoryStream())
                    {
                        using (var cryptStream = new CryptoStream(mem, encryptor, CryptoStreamMode.Write))
                        {
                            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
                            cryptStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                            cryptStream.FlushFinalBlock();
                            return ByteArrayToHexString(mem.ToArray());
                        }
                    }
                }
            }
        }
        public string Decrypt(string encryptedText, string key)
        {
            using (var aes = new RijndaelManaged { Padding = PaddingMode.PKCS7, BlockSize = 128, Mode = CipherMode.ECB, Key = Encoding.ASCII.GetBytes(key) })
            {
                using (var encryptor = aes.CreateDecryptor())
                {
                    using (var mem = new MemoryStream())
                    {
                        using (var cryptStream = new CryptoStream(mem, encryptor, CryptoStreamMode.Write))
                        {
                            var plainTextBytes = HexStringToByteArray(encryptedText);
                            cryptStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                            cryptStream.FlushFinalBlock();
                            return Encoding.UTF8.GetString(mem.ToArray());
                        }
                    }
                }
            }
        }

        private static string ByteArrayToHexString(byte[] ba)
        {
            var hex = new StringBuilder(ba.Length * 2);
            foreach (var b in ba)
            {
                hex.AppendFormat("{0:x2}", b);
            }

            return hex.ToString();
        }

        private static byte[] HexStringToByteArray(string hex)
        {
            var numberChars = hex.Length;
            var bytes = new byte[numberChars / 2];
            for (var i = 0; i < numberChars; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }
            return bytes;
        }
    }
}
