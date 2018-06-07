using System;

namespace QuickApp.Core.Exceptions
{
    public class UnAuthorizationException : Exception
    {
        public string Details { get; private set; }

        public UnAuthorizationException()
        {

        }

        public UnAuthorizationException(string message)
            : base(message)
        {

        }

        public UnAuthorizationException(string message, string details)
            : base(message)
        {
            Details = details;
        }

        public UnAuthorizationException(string message, Exception innerException)
            : base(message, innerException)
        {

        }

        public UnAuthorizationException(string message, string details, Exception innerException)
            : base(message, innerException)
        {
            Details = details;
        }
    }
}
