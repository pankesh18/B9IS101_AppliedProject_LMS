using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class BatchFiles
    {

        public int BatchFileId { get; set; }
        public int BatchId { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string ContainerName { get; set; }
        public string FileURL { get; set; }
        public bool isURL { get; set; }
        public string FileSize { get; set; }
        public string Caption { get; set; }
        public int CreatedBy { get; set; }

    }
}
