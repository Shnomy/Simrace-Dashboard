using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/analyze")]
    [ApiController]
    public class ApiController : Controller
    {
        private readonly ApplicationDbContext _db;
        private UserManager<ApplicationUser> _um;
        
        public ApiController(ApplicationDbContext db, UserManager<ApplicationUser> um)
        {
            _db = db;
            _um = um;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            //var user = await _um.GetUserAsync(User);
            //var ip = user.Ip;
            return Ok(_db.LiveData.ToList());
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAll(int id)
        {
            var user = await _um.GetUserAsync(User);
            var ip = user.Ip;
            Console.WriteLine("ip: {0}", ip);
            return Ok(ip);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}