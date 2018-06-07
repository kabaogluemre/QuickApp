using QuickApp.Core.Cryptography;

namespace QuickApp.Core.Utils
{
    public static class CryptographyHelper
    {
        //Don't change it !
        private static string _key = "parola12parola12";

        public static string Encrypt(string plainText)
        {
            return new SimpleAes().Encrypt(plainText, _key);
        }
        public static string Decrypt(string encryptText)
        {
            return new SimpleAes().Decrypt(encryptText, _key);
        }
    }
}
