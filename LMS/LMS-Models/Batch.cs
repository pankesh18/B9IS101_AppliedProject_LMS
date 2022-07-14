using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class Batch
    {
        public int BatchId { get; set; }
        public string BatchName { get; set; }
        public string BatchYear { get; set; }
        public string CourseName { get; set; }

        public List<LMSUser> BatchStudents { get; set; }
    }
}
