using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Service
{
    public class CloudStorageService
    {
        private string connectionString;
        private CloudBlobContainer objCloudBlobContainer;

        public CloudStorageService(string containerName)
        {
            connectionString = "DefaultEndpointsProtocol=https;AccountName=lmsbatchstorage;AccountKey=SpShUAW3yh4w/clgV6pwcpqjrmA3a8ZpIfDEd5cHt9iF+FKzj+gAWRlARGVPUhbBJ1HyifRNl8z4+ASt2i6xqg==;EndpointSuffix=core.windows.net";

            CloudStorageAccount objCloudStorageAccount = CloudStorageAccount.Parse(connectionString);
            CloudBlobClient objCloudBlobClient = objCloudStorageAccount.CreateCloudBlobClient();
            this.objCloudBlobContainer= objCloudBlobClient.GetContainerReference(containerName);
            //this.objCloudBlobContainer.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });

            //this.objCloudBlobContainer.CreateIfNotExists();

        }



        public void UploadFromStream(String BlobName, Stream source)
        {
            CloudBlockBlob objCloudBlockBlob = this.objCloudBlobContainer.GetBlockBlobReference(BlobName);

            objCloudBlockBlob.UploadFromStream(source);
        }

        public bool DeleteIfExists(String BlobName, DeleteSnapshotsOption deleteSnapshotsOption = DeleteSnapshotsOption.None, AccessCondition accessCondition = null, BlobRequestOptions options = null, OperationContext operationContext = null)
        {
            CloudBlockBlob objCloudBlockBlob = this.objCloudBlobContainer.GetBlockBlobReference(BlobName);

            return objCloudBlockBlob.DeleteIfExists(deleteSnapshotsOption, accessCondition, options, operationContext);
        }
    }
}
