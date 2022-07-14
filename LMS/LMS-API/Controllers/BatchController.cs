using LMS_Models;
using LMS_Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace LMS_API.Controllers
{
    public class BatchController : ApiController
    {

        [HttpPost]
        [ActionName("CreateBatch")]
        public HttpResponseMessage CreateBatch(Batch objBatch)
        {
            try
            {

                BatchService objBatchService = new BatchService();

               int BatchId=objBatchService.CreateBatch(objBatch);

                return Request.CreateResponse(HttpStatusCode.OK, BatchId);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }



        [HttpGet]
        [ActionName("GetAllStudents")]
        public HttpResponseMessage GetAllStudents()
        {
            try
            {
                BatchService objBatchService = new BatchService();

                List<LMSUser> objStudents = objBatchService.GetAllStudents();

                return Request.CreateResponse(HttpStatusCode.OK, objStudents);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpGet]
        [ActionName("GetAllBatches")]
        public HttpResponseMessage GetAllBatches()
        {
            try
            {
                BatchService objBatchService = new BatchService();

                List<Batch> objBatches = objBatchService.GetAllBatches();

                return Request.CreateResponse(HttpStatusCode.OK, objBatches);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpGet]
        [ActionName("GetAllStudentBatches")]
        public HttpResponseMessage GetAllStudentBatches(int StudentUserId)
        {
            try
            {
                BatchService objBatchService = new BatchService();

                List<Batch> objBatches = objBatchService.GetAllStudentBatches(StudentUserId);

                return Request.CreateResponse(HttpStatusCode.OK, objBatches);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }



        [HttpPost]
        [ActionName("AddMeeting")]
        public async Task<HttpResponseMessage> AddMeeting(StudentMeeting objStudentMeeting)
        {
            try
            {
                
                BatchService objBatchService = new BatchService();

                await objBatchService.AddMeeting(objStudentMeeting.BatchId, objStudentMeeting.HostEmail, objStudentMeeting.Topic, objStudentMeeting.StartTime);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpGet]
        [ActionName("GetAllStudentMetings")]
        public HttpResponseMessage GetAllStudentMetings(int StudentUserId)
        {
            try
            {
                BatchService objBatchService = new BatchService();

                List<StudentMeeting> objStudentMeeting = objBatchService.GetAllStudentMetings(StudentUserId);

                return Request.CreateResponse(HttpStatusCode.OK, objStudentMeeting);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }
    }
}