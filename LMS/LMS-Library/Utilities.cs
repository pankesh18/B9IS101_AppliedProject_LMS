using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Library
{
    public static class Utilities
    {

        public static DataTable AsDataTable<T>(this IList<T> data)
        {
            DataTable dtable = new DataTable();
            PropertyDescriptorCollection prop = TypeDescriptor.GetProperties(typeof(T));

            foreach (PropertyDescriptor p in prop)
            {
                dtable.Columns.Add(p.Name, Nullable.GetUnderlyingType(p.PropertyType) ?? p.PropertyType);
            }


            foreach (T item in data)
            {
                DataRow row = dtable.NewRow();
                foreach (PropertyDescriptor p in prop)
                {
                    row[p.Name] = p.GetValue(item) ?? DBNull.Value;
                }


                dtable.Rows.Add(row);
            }
            return dtable;
        }
    }
}
