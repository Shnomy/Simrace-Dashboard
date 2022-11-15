using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;

namespace server.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _db;
        private UserManager<ApplicationUser> _um;

        public HomeController(ApplicationDbContext db, UserManager<ApplicationUser> um)
        {
            _db = db;
            _um = um;
            
            // Currently logged in users are accessible as User
            //User.Identity.Name
            //var user = um.GetUserAsync(User).Result;
            //ViewBag.FirstName = user.FirstName;
        }
        
        public IActionResult Index()
        {
            
            //ip = user.Ip.ToString();
            //Console.WriteLine("ip: {0}", ip);
            return View();
        }

        public async Task<IActionResult> Privacy()
        {
            return View();
        }
        
        public async Task<IActionResult> Connect()
        {
            //var user = await _um.GetUserAsync(User);
            //Console.WriteLine("ip: {0}", user.Ip);
            //ViewBag.Ip = user.Ip;
            //var ip = user.Ip;
            return View();
        }

        public IActionResult Chart()
        {
            return View();
        }
        
        public IActionResult Speed()
        {
            return View();
        }
        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
