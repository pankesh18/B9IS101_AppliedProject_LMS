using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Library
{
    public class LMSException : Exception
    {
        public LMSException(string strMessage) : base(strMessage)
        {

        }

        public LMSException(string strMessage, Exception innerException) : base(strMessage, innerException)
        {

        }

        public LMSException()
        {

        }

    }


    public class DataLayerException : LMSException
    {
        public DataLayerException(string strMessage= "Data Layer Exception") : base(strMessage)
        {

        }

        public DataLayerException(Exception innerException, string strMessage="Data Layer Exception") : base(strMessage, innerException)
        {

        }

    }



    public class ServiceLayerException : LMSException
    {
        public ServiceLayerException(string strMessage = "Service Layer Exception") : base(strMessage)
        {

        }

        public ServiceLayerException(Exception innerException, string strMessage = "Service Layer Exception") : base(strMessage, innerException)
        {

        }

    }
}
