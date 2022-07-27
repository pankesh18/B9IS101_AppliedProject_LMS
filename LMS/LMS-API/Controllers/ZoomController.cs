using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;






using System.Configuration;

using System.IO;

using System.Runtime.InteropServices;
using LMS_Service;
using LMS_Models;

namespace LMS_API.Controllers
{
    public class ZoomController : ApiController
    {
        [HttpGet]
        [ActionName("CreateMeeting")]
        public async Task<HttpResponseMessage> CreateMeeting()
        {
            try
            {


                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpPost]
        [ActionName("oauthredirect")]
        public HttpResponseMessage oauthredirect(string code)
        {
            try
            {
                

                return Request.CreateResponse(HttpStatusCode.OK, "sucess");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpGet]
        [ActionName("ZoomTest")]
        public System.Web.Http.Results.RedirectResult ZoomTest()
        {
            var ClientId = "KOC1VPYjSaaBH39NB82kg";
            var ClientSecret = "5TvtePHr5pKtAp6Tx2TmH6VNHKOu092B";
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes($"{ClientId}:{ClientSecret}");
            var encodedString = $"Basic {System.Convert.ToBase64String(plainTextBytes)}";

            var url = "https://zoom.us/oauth/authorize?response_type=code&client_id=KOC1VPYjSaaBH39NB82kg&redirect_uri=https%3A%2F%2Flocalhost%3A44301";
            RestClient restClient = new RestClient();
            RestRequest request = new RestRequest();

            //var AuthorizationUrl = "https://zoom.us/oauth/authorize?response_type=code&client_id=KOC1VPYjSaaBH39NB82kg&redirect_uri=https%3A%2F%2Flocalhost%3A44310%2Fzoom%2Foauthredirect";
            //var RedirectUrl=


            return Redirect(url);
        }
    }
}