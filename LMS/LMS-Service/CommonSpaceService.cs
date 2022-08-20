﻿using LMS_Library;
using LMS_Models;
using LMS_Repository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;
using System.Web;

namespace LMS_Service
{
    public class CommonSpaceService
    {
        enum env : int
        {
            dev = 0,
            prod = 1
        }

        static string[] DBStrings = {
                @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin",
                @"Server=tcp:dbs-lms-db.database.windows.net,1433;Initial Catalog=db-lms;Persist Security Info=False;User ID=pankesh;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
        };
        string DBConnectionString = DBStrings[Convert.ToInt32(env.prod)];
        public CommonSpaceGroup CreateCommonSpace(CommonSpaceGroup objCommonSpaceGroup)
        {

            try
            {
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objCommonSpaceGroup = CommonSpaceRepository.CreateCommonSpace(objdatabaseService, objCommonSpaceGroup);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            return objCommonSpaceGroup;
        }



        public CommonSpaceFile AddCommonSpaceFile(HttpContext objhttpcontext)
        {
            CommonSpaceFile objCommonSpaceFile;
            try
            {
                string connectionString = DBConnectionString;

                string jsonString = objhttpcontext.Request.Form["CommonSpaceFile"].ToString();

               // objCommonSpaceFile = JsonSerializer.Deserialize<CommonSpaceFile>(jsonString);
                objCommonSpaceFile = JsonConvert.DeserializeObject<CommonSpaceFile>(jsonString);
                objCommonSpaceFile.ContainerName = "lmsbatchcontainer";

                CloudStorageService objCloudStorageService = new CloudStorageService(objCommonSpaceFile.ContainerName + "/"+ objCommonSpaceFile.FolderName);
                System.IO.Stream httpPostedFile = objhttpcontext.Request.Files["File"].InputStream;

                objCloudStorageService.UploadFromStream(objCommonSpaceFile.FileName + objCommonSpaceFile.FileExtension, httpPostedFile);
                
                
                objCommonSpaceFile.FileURL = "https://lmsbatchstorage.blob.core.windows.net/" + objCommonSpaceFile.ContainerName + "/" + objCommonSpaceFile.FolderName + "/" + objCommonSpaceFile.FileName + objCommonSpaceFile.FileExtension;


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objCommonSpaceFile = CommonSpaceRepository.AddCommonSpaceFile(objdatabaseService, objCommonSpaceFile);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            return objCommonSpaceFile;
        }


        public CommonSpaceFile AddCommonSpaceNote(CommonSpaceFile objCommonSpaceFile)
        {

            try
            {
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objCommonSpaceFile = CommonSpaceRepository.AddCommonSpaceFile(objdatabaseService, objCommonSpaceFile);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            return objCommonSpaceFile;
        }

        public List<CommonSpaceGroup> GetCommonSpaceGroup(int BatchId)
        {
             List<CommonSpaceGroup> objCommonSpaceGroupList = new List<CommonSpaceGroup>();
            try
            {
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objCommonSpaceGroupList = CommonSpaceRepository.GetCommonSpaceGroup(objdatabaseService, BatchId);

                    if(objCommonSpaceGroupList.Count > 0)
                    {
                        foreach(var objGroup in objCommonSpaceGroupList)
                        {
                            objGroup.CommonSpaceGroupStudent= CommonSpaceRepository.GetCommonSpaceGroupStudent(objdatabaseService, BatchId, objGroup.CommonSpaceGroupId);

                            objGroup.CommonSpaceGroupFiles = CommonSpaceRepository.GetCommonSpaceGroupFile(objdatabaseService, BatchId, objGroup.CommonSpaceGroupId);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            return objCommonSpaceGroupList;
        }
    }
}
