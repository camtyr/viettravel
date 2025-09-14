﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Token { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
}