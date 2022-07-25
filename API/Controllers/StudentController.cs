using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private Db db;

        public StudentController(Db db)
        {
            this.db = db;
        }

        [HttpGet]
        public IList<Student> GetAll()
        {
            return (this.db.Students.ToList());
        }
    }
}