using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Entities
{
    public class DestinationImage
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;

        // Liên kết với Destination
        public int DestinationId { get; set; }
        public Destination Destination { get; set; }
    }
}
