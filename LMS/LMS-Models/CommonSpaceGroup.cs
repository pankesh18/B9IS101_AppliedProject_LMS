using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Models
{
    public class CommonSpaceGroup
    {
        public int CommonSpaceGroupId { get; set; }
        public int BatchId { get; set; }
        public string GroupName { get; set; }
        public List<LMSUser> CommonSpaceGroupStudent { get; set; }
        public List<CommonSpaceFile> CommonSpaceGroupFiles { get; set; }
          
    }
}
