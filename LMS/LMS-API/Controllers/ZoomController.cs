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
        public async Task<HttpResponseMessage> CreateMeeting(int batchId)
        {
            try
            {

                var ZoomEmailId = "wadekar.pankesh@gmail.com";
                var meeting = "https://api.zoom.us/v2/users/{userId}/meetings";
                meeting = meeting.Replace("{userId}", ZoomEmailId);
                var JWTToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InNWVURYdElCUmEtQW9Vbm9VZ281d3ciLCJleHAiOjE2NTgyNjk3MjgsImlhdCI6MTY1NzY2NDkyOH0.zTNdjxy5QXq_d5vNWMDOvXYS07KkyfYkJiekLpLmvE0";

                var APIkey = "sVUDXtIBRa-AoUnoUgo5ww";
                var Secret = "kuwZys1lCL94hprzSvSGFSrz4X9Dc6BeFte6";

                ZoomService objZoom = new ZoomService();

                //var JWTToken = objZoom.GenerateJWToken(APIkey, Secret);

                //ZoomMeeting zoomMeeting = await objZoom.CreateZoomMeetingAsync(meeting, JWTToken, batchId);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }



    }
}