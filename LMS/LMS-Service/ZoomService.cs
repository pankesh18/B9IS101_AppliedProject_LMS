using LMS_Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace LMS_Service
{
    public class ZoomService
    {

        public async Task<BatchMeeting> CreateZoomMeetingAsync(string ZoomMeetingUrl, string token, string MeetingTopic, DateTime startTime)
        {
            HttpResponseMessage response = null;
            string ResponseMessage = string.Empty;
            Dictionary<string, object> MeetingParameters = new Dictionary<string, object>();
            MeetingParameters.Add("settings", new Dictionary<string, object> { { "approval_type", 0 } });
            MeetingParameters.Add("Meeting Type", 2);
            MeetingParameters.Add("topic", MeetingTopic);

            var t = Convert.ToDateTime(startTime);

            var time = Convert.ToDateTime(startTime).ToString("yyyy-MM-ddTHH\\:mm\\:ssZ");

            MeetingParameters.Add("start_time", time);
            BatchMeeting zoomMeeting = new BatchMeeting();

            try
            {
                using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, ZoomMeetingUrl))
                {
                    request.Content = new StringContent(JsonConvert.SerializeObject(MeetingParameters), Encoding.UTF8, "application/json");

                    HttpClient httpClient = new HttpClient();

                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    response = await httpClient.SendAsync(request);
                    if (!response.IsSuccessStatusCode)
                    {
                        throw new WebException("Error in Meeting Creation with statusCode:" + response.StatusCode);
                    }

                    ResponseMessage = await response.Content.ReadAsStringAsync();
                   
                    

                    var ZoomObject= JObject.Parse(ResponseMessage);
                    zoomMeeting.StartUrl = (string)ZoomObject["start_url"];
                    zoomMeeting.JoinUrl = (string)ZoomObject["join_url"];
                    zoomMeeting.UUID = (string)ZoomObject["uuid"];
                    zoomMeeting.ZoomMeetingId = (string)ZoomObject["id"];

                    zoomMeeting.HostId = (string)ZoomObject["host_id"];
                    zoomMeeting.HostEmail = (string)ZoomObject["host_email"];
                    zoomMeeting.Topic = (string)ZoomObject["topic"];
                    zoomMeeting.Status = (string)ZoomObject["status"];

                    zoomMeeting.StartTime = (DateTime)ZoomObject["start_time"];
                    zoomMeeting.Duration = (int)ZoomObject["duration"];
                    zoomMeeting.Timezone = (string)ZoomObject["timezone"];
                    zoomMeeting.Password = (string)ZoomObject["password"];


                }

            }
            catch (Exception ex)
            {
                throw;
            }

            return zoomMeeting;
        }


        public string GenerateJWToken(string APIKey, string SecretKey)
        {

            string JWToken = "";
            try
            {

                var now = DateTime.UtcNow;

                // Create Security key  using private key above:
                // not that latest version of JWT using Microsoft namespace instead of System
                //var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));

                var signingKey = new InMemorySymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
                var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));

                // Also note that securityKey length should be >256b
                // so you have to make sure that your private key has a proper length
                //
                var credentials = new System.IdentityModel.Tokens.SigningCredentials(signingKey, System.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature, System.IdentityModel.Tokens.SecurityAlgorithms.Sha256Digest);
                var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
                //  Finally create a Token
                //var header = new JwtHeader(signingCredentials);

                var header = new JwtHeader
                {
                    {"alg", "HS256"},
                     { "typ", "JWT" }                 
                };
                //Some PayLoad that contain information about the  customer
                var payload = new JwtPayload
                            {
                                 { "iss", APIKey},
                                 { "exp", 1496091964000}
                            };


                

                //
                var secToken = new JwtSecurityToken(header, payload);
                var handler = new JwtSecurityTokenHandler();

                // Token to String so you can use it in your client
                JWToken = handler.WriteToken(secToken);
            }
            catch (Exception objException)
            {
                throw;
            }

            return JWToken;
        }


    }
}
