using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;


namespace WebAPI.Controllers
{
    public class DepartmentController : ApiController
    {

        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();
            string query = @"select DepartmentID,DepartmentName from dbo.Departments";
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
            var command = new SqlCommand(query, conn);
            using (var da = new SqlDataAdapter(command)) {
                command.CommandType = CommandType.Text;
                da.Fill(dt);
            };
            return Request.CreateResponse(HttpStatusCode.OK,dt);
        }

        [HttpPost]
        public string Post(Department dep)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"insert into dbo.Departments values ('"+dep.DepartmentName+@"')";
                var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, conn);
                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(dt);
                };
                return "Added Successfully";
            }
            catch (Exception)
            {

                return "Failed to add";
            }

        }



        [HttpPut]
        public string Put(Department dep)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Update dbo.Departments set DepartmentName='" + dep.DepartmentName + @"' where DepartmentID="+dep.DepartmentID+@"";                    
                var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, conn);
                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(dt);
                };
                return "Updated Successfully";
            }
            catch (Exception)
            {

                return "Failed to Update";
            }

        }


        [HttpDelete]
        public string Delete(int id)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Delete dbo.Departments where DepartmentID=" + id + @"";
                var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, conn);
                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(dt);
                };
                return "Deleted Successfully";
            }
            catch (Exception)
            {

                return "Failed to Delete";
            }
        }
    }
}
