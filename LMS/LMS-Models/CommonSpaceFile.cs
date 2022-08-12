using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class CommonSpaceFile
    {
        public int CommonSpaceFileId { get; set; }
        public string FileName { get; set; }
        public int ContentType { get; set; }
        public int BatchId { get; set; }
        public int CommonSpaceGroupId { get; set; }
        public int NoteId { get; set; }
        public string FileURL { get; set; }
        public string FileExtension { get; set; }
        public string ContainerName { get; set; }
        public string FolderName { get; set; }
        public string FileSize { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
