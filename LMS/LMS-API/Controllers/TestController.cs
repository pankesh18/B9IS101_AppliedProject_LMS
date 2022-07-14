using LMS_Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LMS_API.Controllers
{
    public class TestController : ApiController
    {
        [HttpGet]
        [ActionName("test")]
        public HttpResponseMessage TestMethod()
        {
            string msg = "Helllo World!";
            Console.WriteLine(msg);

            LMSService obj = new LMSService();
            var obj1 =obj.TestMethod();

            
            return Request.CreateResponse(HttpStatusCode.OK, obj1);
        }
    }
}
