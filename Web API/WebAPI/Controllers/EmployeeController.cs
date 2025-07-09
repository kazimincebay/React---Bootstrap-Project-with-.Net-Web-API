using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {

        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();
            string query = @"select EmployeeID,EmployeeName,Department,Mail,CONVERT(varchar(10),DOJ,101) as DOJ from dbo.Employees";
            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
            var command = new SqlCommand(query, conn);
            using (var da = new SqlDataAdapter(command))
            {
                command.CommandType = CommandType.Text;
                da.Fill(dt);
            };
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        [HttpPost]
        public string Post(Employee emp)
        {
            try
            {
                DataTable dt = new DataTable();
                string doj = emp.DOJ.ToString().Split(' ')[0];
                string query = @"insert into dbo.Employees (EmployeeName,Department,Mail,DOJ) values ('" + emp.EmployeeName + @"','" + emp.Department + @"','" + emp.Mail + @"','" + doj + @"')";
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

                return "Failed to Add";
            }
        }

        [HttpPut]
        public string Put(Employee emp)
        {
            try
            {
                DataTable dt = new DataTable();
                string query = @"Update dbo.Employees set EmployeeName='" + emp.EmployeeName + @"', Department='" + emp.Department + @"', Mail='" + emp.Mail + @"',DOJ='" + emp.DOJ + @"' where EmployeeID=" + emp.EmployeeID + @"";
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
                string query = @"Delete dbo.Employees where EmployeeID=" + id + @"";
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
