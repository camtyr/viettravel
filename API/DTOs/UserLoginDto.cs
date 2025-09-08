using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserLoginDto
    {
        public string Email { get; set; } // Changed from Username to Email
        public string Password { get; set; }
    }

}