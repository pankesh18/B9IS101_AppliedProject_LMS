using LMS_Models;
using LMS_Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LMS_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LMSUserController : ApiController
    {


        [HttpPost]
        [ActionName("RegisterUser")]
        public HttpResponseMessage RegisterUser(LMSUser objLMSUser)
        {
            try
            {
                string msg = "Helllo World!";
                LMSUserService objLMSUserService = new LMSUserService();
               // LMSUser objLMSUser = null;
                objLMSUserService.Register(objLMSUser);

                return Request.CreateResponse(HttpStatusCode.OK, msg);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpGet]
        [ActionName("LoginUser")]
        public HttpResponseMessage LoginUser(string UserEmail, string UserPassword)
        {
            try
            {
                LMSUser loggedInUser;
                LMSUserService objLMSUserService = new LMSUserService();
                // LMSUser objLMSUser = null;
                loggedInUser=objLMSUserService.LoginUser(UserEmail, UserPassword);

                return Request.CreateResponse(HttpStatusCode.OK, loggedInUser);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }



        [HttpGet]
        [ActionName("GetUserDetails")]
        public HttpResponseMessage GetUserDetails(int UserId)
        {
            try
            {
                LMSUser loggedInUser;
                LMSUserService objLMSUserService = new LMSUserService();

                loggedInUser = objLMSUserService.GetUserDetails(UserId);

                return Request.CreateResponse(HttpStatusCode.OK, loggedInUser);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }
    }
}