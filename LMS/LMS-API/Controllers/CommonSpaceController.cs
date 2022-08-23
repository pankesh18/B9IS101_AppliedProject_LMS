using LMS_Models;
using LMS_Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace LMS_API.Controllers
{
    public class CommonSpaceController : ApiController
    {

        [HttpPost]
        [ActionName("CreateCommonSpace")]
        public HttpResponseMessage CreateCommonSpace(CommonSpaceGroup objCommonSpaceGroup)
        {
            try
            {

                CommonSpaceService objCommonSpaceService = new CommonSpaceService();

                objCommonSpaceGroup = objCommonSpaceService.CreateCommonSpace(objCommonSpaceGroup);

                return Request.CreateResponse(HttpStatusCode.OK, objCommonSpaceGroup);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpPost]
        [ActionName("AddCommonSpaceFile")]
        public HttpResponseMessage AddCommonSpaceFile()
        {
            try
            {

                CommonSpaceService objCommonSpaceService = new CommonSpaceService();

                CommonSpaceFile objCommonSpaceFile = objCommonSpaceService.AddCommonSpaceFile(HttpContext.Current);

                return Request.CreateResponse(HttpStatusCode.OK, objCommonSpaceFile);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpPost]
        [ActionName("AddCommonSpaceNote")]
        public HttpResponseMessage AddCommonSpaceNote(CommonSpaceFile objCommonSpaceFile)
        {
            try
            {

                CommonSpaceService objCommonSpaceService = new CommonSpaceService();

                objCommonSpaceFile = objCommonSpaceService.AddCommonSpaceNote(objCommonSpaceFile);

                return Request.CreateResponse(HttpStatusCode.OK, objCommonSpaceFile);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpGet]
        [ActionName("GetCommonSpaceGroup")]
        public HttpResponseMessage GetCommonSpaceGroup(int BatchId)
        {
            try
            {

                CommonSpaceService objCommonSpaceService = new CommonSpaceService();
                List<CommonSpaceGroup> objCommonSpaceGroupList = objCommonSpaceService.GetCommonSpaceGroup(BatchId);

                return Request.CreateResponse(HttpStatusCode.OK, objCommonSpaceGroupList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }


        [HttpPost]
        [ActionName("DeleteCommonSpaceFile")]
        public HttpResponseMessage DeleteCommonSpaceFile(CommonSpaceFile objCommonSpaceFile)
        {
            try
            {

                CommonSpaceService objCommonSpaceService = new CommonSpaceService();

                objCommonSpaceService.DeleteCommonSpaceFile(objCommonSpaceFile);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

    }
}