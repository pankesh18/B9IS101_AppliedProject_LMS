using LMS_Models;
using LMS_Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
        public HttpResponseMessage GetAllBatches(int UserId)
        {
            try
            {
                BatchService objBatchService = new BatchService();

                List<Batch> objBatches = objBatchService.GetAllBatches(UserId);

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



        [HttpPost]
        [ActionName("AddFilesToBatch")]
        public HttpResponseMessage AddFilesToBatch()
        {
            try
            {
                
                BatchService objBatchService = new BatchService();

                BatchFiles objBatchFiles = objBatchService.AddFilesToBatch(HttpContext.Current);

                return Request.CreateResponse(HttpStatusCode.OK, objBatchFiles);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpGet]
        [ActionName("GetAllMeetingsByBatchId")]
        public HttpResponseMessage GetAllMeetingsByBatchId(int BatchId)
        {
            try
            {
                BatchService objBatchService = new BatchService();

                List<StudentMeeting> objStudentMeeting = objBatchService.GetAllMeetingsByBatchId(BatchId);

                return Request.CreateResponse(HttpStatusCode.OK, objStudentMeeting);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpGet]
        [ActionName("GetAllFilesByBatchId")]
        public HttpResponseMessage GetAllFilesByBatchId(int BatchId)
        {
            try
            {
                BatchService objBatchService = new BatchService();

                List<BatchFiles> objBatchFiles = objBatchService.GetAllFilesByBatchId(BatchId);

                return Request.CreateResponse(HttpStatusCode.OK, objBatchFiles);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpGet]
        [ActionName("GetBatchMeetingDetails")]
        public HttpResponseMessage GetBatchMeetingDetails(int BatchMeetingId)
        {
            try
            {
                BatchService objBatchService = new BatchService();

                StudentMeeting objStudentMeeting = objBatchService.GetBatchMeetingDetails(BatchMeetingId);

                return Request.CreateResponse(HttpStatusCode.OK, objStudentMeeting);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }
    }
}